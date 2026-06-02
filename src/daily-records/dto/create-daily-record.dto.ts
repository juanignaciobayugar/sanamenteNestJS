import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateDailyRecordDto {
  @IsString()
  fecha: string;

  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  // @IsInt() fallaría si mandás un null puro, así que usamos un truco de class-validator:
  // Permitimos que el valor sea explícitamente null
  @Min(1)
  @Max(4)
  estadoEmocional?: number | null;

  @IsOptional()
  @Min(1)
  @Max(12)
  estadoEnergia?: number | null;

  @IsOptional()
  @Min(1)
  @Max(10)
  estadoDolor?: number | null;
}