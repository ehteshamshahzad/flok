import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { seedCategories } from './seed';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) { }

  async create(createCategoryInput: CreateCategoryInput) {

    const categoryENPromise = this.categoriesRepository.findOne({ where: { nameEN: createCategoryInput.nameEN }, select: { id: true } });
    const categoryFRPromise = this.categoriesRepository.findOne({ where: { nameFR: createCategoryInput.nameFR }, select: { id: true } });
    const categoryDEPromise = this.categoriesRepository.findOne({ where: { nameDE: createCategoryInput.nameDE }, select: { id: true } });
    const categoryITPromise = this.categoriesRepository.findOne({ where: { nameIT: createCategoryInput.nameIT }, select: { id: true } });

    const errorMessages: string[] = [];

    if (await categoryENPromise) {
      errorMessages.push(`Category with the name ${createCategoryInput.nameEN} already exists`);
    }

    if (await categoryFRPromise) {
      errorMessages.push(`Category with the name ${createCategoryInput.nameFR} already exists`);
    }

    if (await categoryDEPromise) {
      errorMessages.push(`Category with the name ${createCategoryInput.nameDE} already exists`);
    }

    if (await categoryITPromise) {
      errorMessages.push(`Category with the name ${createCategoryInput.nameIT} already exists`);
    }

    if (errorMessages.length > 0) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Category already exists',
        message: errorMessages
      }, HttpStatus.BAD_REQUEST);
    }

    const category = new Category();
    category.setId = undefined;
    category.nameEN = createCategoryInput.nameEN;
    category.nameFR = createCategoryInput.nameFR;
    category.nameDE = createCategoryInput.nameDE;
    category.nameIT = createCategoryInput.nameIT;

    return await this.categoriesRepository.save(category);
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string) {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async seed(id: string) {
    for (let i = 0; i < seedCategories.length; i++) {
      seedCategories[i].setId = undefined;
      await this.categoriesRepository.save(seedCategories[i]);
    }

    return await this.categoriesRepository.find();
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
