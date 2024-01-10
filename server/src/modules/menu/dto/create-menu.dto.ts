// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  readonly label: string;
  @ApiProperty({ required: false, default: null })
  readonly parent?: string | null;
}

export class UpdateMenuDto {
  @ApiProperty({ required: false })
  readonly label: string;
  @ApiProperty({ required: true })
  readonly _id: string;
}

export class DeleteMenuDto {
  @ApiProperty({ required: true })
  readonly _id: string;
}
