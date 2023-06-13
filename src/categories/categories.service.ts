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

  async seed() {
    const savedCategoriesPromise: Promise<Category>[] = [];

    for (let i = 0; i < seedCategories.length; i++) {
      const category = new Category();
      category.setId = undefined;
      category.nameDE = seedCategories[i].nameDE;
      category.nameEN = seedCategories[i].nameEN;
      category.nameFR = seedCategories[i].nameFR;
      category.nameIT = seedCategories[i].nameIT;
      savedCategoriesPromise.push(this.categoriesRepository.save(category));
    }
    for (let i = 0; i < savedCategoriesPromise.length; i++) {
      await savedCategoriesPromise[i];
    }
    const categories = await this.categoriesRepository.find()
    return categories;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const categories = await this.categoriesRepository.find();
    await Promise.all(categories.map(x => this.categoriesRepository.delete(x.id)));
    const categoriesLeft = await this.categoriesRepository.find();
    return categoriesLeft;
  }
}
