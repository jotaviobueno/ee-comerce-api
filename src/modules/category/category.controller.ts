import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoryService.create(createCategoryDto);
  // }
  // @Get()
  // findAll() {
  //   return this.categoryService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
