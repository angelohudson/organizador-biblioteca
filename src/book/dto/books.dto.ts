import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsNotEmptyObject, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { AuthorDTO } from "./author.dto";

export class BookDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly language: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly releaseYear: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly publisher: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly pages: number;

    @IsNotEmpty()
    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    readonly author: AuthorDTO[];
}