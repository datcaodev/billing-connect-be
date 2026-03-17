import { plainToInstance } from 'class-transformer';

export type PaginationResponse<T> = {
  content: T[];
  currentPage: number;
  pageSize: number;
  currentTotalElementsCount: number;
  pagesCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  total: number;
};

export function mapPaginatedData<T, V>(params: {
  entities: T[],
  total: number,
  skip: number,
  take: number,
  dtoClass: new () => V

}): PaginationResponse<V> {
  const { dtoClass, entities, skip, take, total } = params
  const items = plainToInstance(dtoClass, entities, {
    excludeExtraneousValues: true,
    // enableImplicitConversion: true // hiện null nếu k có giá trị
  });

  const currentPage = Math.floor(skip / take);
  const totalPages = Math.ceil(total / take);

  return {
    content: items,
    currentPage,
    pageSize: take,
    currentTotalElementsCount: items.length,
    pagesCount: totalPages,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    total,
  };
}


export function mapData<T, V>(params: {
  entities: T,
  dtoClass: new () => V

}): V {
  const { dtoClass, entities } = params
  const items = plainToInstance(dtoClass, entities, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true // hiện null nếu k có giá trị
  });
  return items;
}

export function mapDataArray<T, V>(params: {
  entities: T[];
  dtoClass: new () => V;
}): V[] {
  const { dtoClass, entities } = params;

  const items = plainToInstance(dtoClass, entities, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true // hiện null nếu k có giá trị
  });

  return items;
}
