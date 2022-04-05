import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateProductRequest,
  CreateProductResponse,
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from './product.pb';

@Controller('product')
export class ProductController implements OnModuleInit {
  private logger: Logger = new Logger('ProductController');
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }
  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<CreateProductResponse>> {
    this.logger.debug({ ...body });
    return this.svc.createProduct(body);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ id });
  }
}
