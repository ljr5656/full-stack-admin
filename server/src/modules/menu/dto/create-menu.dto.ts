// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty({ required: false, default: null })
  readonly parent_id?: string | null;
  @ApiProperty({ required: true })
  readonly path: string;
  @ApiProperty({ required: true })
  readonly component: string;
}

export class UpdateMenuDto {
  @ApiProperty({ required: false })
  readonly name: string;
  @ApiProperty({ required: true })
  readonly _id: string;
}

export class DeleteMenuDto {
  @ApiProperty({ required: true })
  readonly _id: string;
}
