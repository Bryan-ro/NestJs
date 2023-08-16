// teste

import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesServices: CoursesService) {}

  @Get()
  findFiltered(@Query("filter") filter?: string) { 
    const filterNaN = Number(filter);

    return this.coursesServices.findFiltered(!isNaN(filterNaN)? Number(filter): filter);
  }

  @Post()
  create(@Body() CreateCourseDto: CreateCourseDto) {
    return this.coursesServices.create(CreateCourseDto);
  }


  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateCourseDto) {
    return this.coursesServices.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.coursesServices.remove(id);
  }
}
