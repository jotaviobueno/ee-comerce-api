import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('product-category')
export class ProductCategoryController {
  constructor() {} // private readonly productCategoryService: ProductCategoryService,

  // @Post()
  // create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
  //   return this.productCategoryService.create(createProductCategoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.productCategoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productCategoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  // ) {
  //   return this.productCategoryService.update(+id, updateProductCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productCategoryService.remove(+id);
  // }
}
