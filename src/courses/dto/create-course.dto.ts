import { IsString, IsNotEmpty } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({
    each: true
  })
  readonly tags: string[];
}

 