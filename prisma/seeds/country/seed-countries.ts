import { PrismaClient } from '@prisma/client';
import { City, State, Country } from './types';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(
    async (tx) => {
      const { data: countries } = await axios.get<Country[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/paises',
      );

      const createCountryDto = countries.map((country) => ({
        name: country.nome,
        iso3: country?.id['ISO-ALPHA-3'],
        iso2: country?.id['ISO-ALPHA-2'],
        intermediaryRegion: country['regiao-intermediaria']?.nome,
        subRegion: country['sub-regiao']?.nome,
        continent: country['sub-regiao']?.regiao?.nome,
        deletedAt: null,
      }));

      await tx.country.createMany({ data: createCountryDto });

      const brazil = await tx.country.findFirst({
        where: { iso3: 'BRA', deletedAt: null },
      });

      const { data: states } = await axios.get<State[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
      );

      const createStateDto = states.map((state) => ({
        name: state.nome,
        code3: state.sigla,
        ibgeId: state?.id?.toString(),
        countryId: brazil.id,
        region: state.regiao.nome,
        deletedAt: null,
      }));

      await tx.state.createMany({
        data: createStateDto,
      });

      const createCityDto = await Promise.all(
        states
          .map(async (state) => {
            const stateData = await tx.state.findFirst({
              where: {
                code3: state.sigla,
                deletedAt: null,
              },
            });

            const { data } = await axios.get<City[]>(
              `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateData.code3}/municipios`,
            );

            return data.map((city) => ({
              ibgeId: city?.id?.toString(),
              name: city.nome,
              stateId: stateData.id,
              deletedAt: null,
            }));
          })
          .flat(),
      );

      const data = createCityDto.flatMap((city) => city);

      await tx.city.createMany({
        data: data,
      });
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
