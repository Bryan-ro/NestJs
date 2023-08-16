/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1, 
      name: "Fundamentos do framework NestJs",
      description: "Fundamentos do framework Nest",
      tags: ["node.js", "nestJS", "javaScript"]
    },
    {
      id: 2, 
      name: "Fundamentos do ORM Prisma",
      description: "Fundamentos do framework Nest",
      tags: ["node.js", "nestJS", "javaScript"]
    }
  ];

  public findFiltered(filter?: string | number) {
    const course = filter ? this.courses.filter(c => c.name === filter || c.id === filter): this.courses;

    if(course.length === 0) {
      throw new NotFoundException("Course not found");
    } 
    return course;
  }

  public create(createCourseDto: any) {
    const newId = this.courses.length + 1;

    const coursesWithId = {
      id: newId,
      ...createCourseDto
    };

    this.courses.push(coursesWithId);
    
    return createCourseDto;
  }

  public update(id: number, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(c => c.id === Number(id));
    
    const currentInfos = {
      id: Number(id),
      name: updateCourseDto.name ?? this.courses[indexCourse].name,
      description: updateCourseDto.description ?? this.courses[indexCourse].description,    
      tags: updateCourseDto.tags ?? this.courses[indexCourse].tags
    };
    
    this.courses[indexCourse] = currentInfos; 
  }

  public remove(id: number) {
    const indexCourse = this.courses.findIndex(c => c.id === Number(id));
    console.log(indexCourse);
    if(indexCourse > -1)
      this.courses.splice(indexCourse, 1);
     
  }
}