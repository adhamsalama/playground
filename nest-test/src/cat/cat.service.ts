import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

const cats: { name: string; color: string }[] = [];
@Injectable()
export class CatService {
  create(createCatDto: CreateCatDto) {
    console.log('create');

    cats.push({ name: createCatDto.name, color: createCatDto.color });
    return cats.at(-1);
  }

  findAll() {
    return cats;
  }

  findOne(name: string) {
    console.log({ name, cats });

    return cats.find((cat) => cat.name == name);
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
