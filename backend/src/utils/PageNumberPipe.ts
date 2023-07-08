import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PageNumberPipe implements PipeTransform {
  transform(value: number, _metadata: ArgumentMetadata) {
    if (value <= 0) {
      return 1;
    }
    return value;
  }
}
