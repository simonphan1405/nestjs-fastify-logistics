Để đưa dự án Logistics của bạn (Quản lý Tàu, Cảng, Chuyến hàng) lên Clean Architecture một cách **thực tế, không cực đoan nhưng vẫn đảm bảo tính bền vững**, chúng ta sẽ đi qua từng phần một. Tôi sẽ ưu tiên cách tiếp cận cân bằng giữa lý thuyết Clean Architecture gốc (của Uncle Bob) và các convention có sẵn của NestJS.

---

### 1. Clean Architecture trong bối cảnh NestJS

- **Clean Architecture là gì?** Nó là triết lý thiết kế phần mềm xoay quanh việc tách biệt logic nghiệp vụ (Core Business) ra khỏi các yếu tố công nghệ bên ngoài (Framework NestJS, Database Prisma/TypeORM, Giao diện API).
- **Vấn đề phổ biến nếu không áp dụng:**
  - **"Fat Service":** File `shipments.service.ts` chứa từ logic nghiệp vụ (tính toán phí vận chuyển), thao tác cơ sở dữ liệu (`prisma.shipment.create`), đến cả việc trả về lỗi HTTP (`HttpException`).
  - **Khó Unit Test:** Để test một logic nhỏ, bạn phải dựng cả kết nối DB và môi trường NestJS vì code bị dính chặt với nhau.
  - **Khó nâng cấp/thay đổi:** Nếu sau này muốn đổi từ REST API sang GraphQL, hoặc đổi ORM từ Prisma sang TypeORM, bạn sẽ phải đập đi xây lại gần như toàn bộ.
- **Lợi ích & Trade-off khi thực hiện:**
  - _Lợi ích:_ Code rất dễ đọc, dễ test độc lập. Dễ dàng chia việc cho nhiều người (người làm UI/API, người làm DB, người code logic core).
  - _Trade-off:_ Tăng số lượng file và thư mục. Bạn phải viết nhiều boilerplate code (như Interface, Mapper) hơn. Không phù hợp với các endpoint chỉ đơn thuần là CRUD ngắn gọn kiểu `select * from table`.

---

### 2. Đề xuất cấu trúc thư mục thực chiến

Trong một dự án NestJS, ta nên chia thư mục theo từng Module (ví dụ: `shipments`, `ships`, `ports`), và bên trong mỗi module ta áp dụng Clean Architecture. Đây gọi là kiểu kiến trúc **Screaming Architecture / Feature-based**.

Ví dụ với thư mục `src/shipments`:

```text
src/shipments/
├── domain/            # (Core) - Luật lệ nghiệp vụ, không phụ thuộc framework
├── application/       # (Use Cases) - Kịch bản ứng dụng, luồng dữ liệu
├── infrastructure/    # (Outside) - Kết nối DB, gửi Email, gọi API ngoài
└── presentation/      # (Outside) - Routes, Controller, Validate Input HTTP
```

**Trách nhiệm từng Layer:**

- **Domain:** Chứa các `Entities` (Thực thể), `Value Objects`. Đây là những class TS thuần túy phản ánh nghiệp vụ thực tế (Ví dụ: `Shipment` phải có nguyên tắc cập nhật trạng thái từ _Pending_ -> _In Transit_ -> _Delivered_).
- **Application:** Chứa các `Use Cases` (Hành động của người dùng như `CreateShipmentUseCase`, `CancelShipmentUseCase`). Tại đây cũng định nghĩa các `Interfaces` (Ports) cho các dịch vụ bên ngoài (như `IShipmentRepository`).
- **Infrastructure:** Là nơi triển khai (Implementation) các Interfaces ở trên. Chứa logic giao tiếp với Prisma, TypeORM, Redis, v.v.
- **Presentation:** Nhận request từ HTTP, chạy validation (Pipe/DTO), gọi Use Case tương ứng và trả về Response.

---

### 3. Nguyên tắc Dependency Rule (Quy tắc phụ thuộc)

> **Luật bất biến:** Logic bên trong (Domain, App) KHÔNG BAO GIỜ được biết hay import bất kỳ cái gì từ bên ngoài (Infra, Presentation). Chiều phụ thuộc luôn hướng vào trung tâm: **Presentation -> Application -> Domain <- Infrastructure**.

**Cụ thể trong NestJS:**

- **Domain:** KHÔNG import cái gì từ NestJS, Prisma hay Express/Fastify.
- **Application:**
  - Được phép import từ **Domain**.
  - _Sự tha thứ thực chiến:_ Dù lý thuyết cấm Framework lọt vào Application, nhưng ở NestJS, ta CÓ THỂ cho phép dùng `@Injectable()` cho các Use Cases để tận dụng Dependency Injection (DI) mạnh mẽ của Nest mà không phải viết các file wiring rườm rà.
  - Tuyệt đối không import `PrismaClient` hay các thư viện DB vào đây.
- **Infrastructure:** Chứa Logic của Prisma, TypeORM. Được phép import từ **Application** (để implements các interfaces) và **Domain** (để map Prisma Models sang Domain Entities). NestJS `Repository`, `PrismaService` nằm ở đây.
- **Presentation:** Chứa `Controller`, HTTP DTO, `@Get(), @Post()`. Phụ thuộc vào **Application**.

---

### 4. Chiến lược Refactor (6 Bước an toàn)

Không nên đập đi xây lại, hãy thực hiện theo 6 bước với từng endpoint một:

1.  **Bước 1: Khảo sát cấu trúc hiện tại.** Xác định một logic đơn giản nhất trong Controller/Service để làm chuột bạch (VD: Tạo mới chuyến hàng).
2.  **Bước 2: Tách business logic ra khỏi controller/service.** Tạo thư mục `application/use-cases`. Chuyển logic kiểm tra và xử lý vào 1 file Use Case duy nhất. (Lúc này Use Case vẫn đang gọi tạm Service cũ).
3.  **Bước 3: Tạo Entity, Interface (Abstraction).** Trong `domain` tạo class `ShipmentEntity`. Trong `application/ports` tạo `IShipmentRepository` định nghĩa các hàm như `save()`, `findById()`. Sửa Use Case để sử dụng Interface này thay vì dùng DB Service trực tiếp.
4.  **Bước 4: Di chuyển code Database.** Tạo `infrastructure/repositories/prisma-shipment.repository.ts`, class này sẽ `implements IShipmentRepository`. Ở đây bạn dùng Prisma để lưu dữ liệu, sau đó convert từ Prisma Model về `ShipmentEntity`.
5.  **Bước 5: Tổ chức lại DI (Wiring).** Tại `shipments.module.ts`, bạn map cái Interface với Implementation bằng cơ chế Provider của Nest: `{ provide: IShipmentRepository, useClass: PrismaShipmentRepository }`.
6.  **Bước 6: Kiểm tra lại Test.** Viết Unit Test cho Use Case cực kỳ dễ vì bây giờ bạn chỉ cần mock cái `IShipmentRepository`. Xóa file service cũ.

---

### 5. Ví dụ cụ thể (Module: Shipments)

Dưới đây là một cấu trúc code thực tế, không over-engineered.

**1. Domain Entity (`src/shipments/domain/entities/shipment.entity.ts`)**

```typescript
// Chỉ chứa Class thuần, không @Injectable, không @Prisma
export class Shipment {
  constructor(
    public readonly id: string,
    public cargoName: string,
    public weight: number,
    public status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED',
  ) {}

  // Logic nghiệp vụ nằm ngay tại đây
  startTransit(): void {
    if (this.status !== 'PENDING') {
      throw new Error('Chỉ có thể vận chuyển khi đơn hàng đang PENDING');
    }
    this.status = 'IN_TRANSIT';
  }
}
```

**2. Repository Interface (`src/shipments/application/ports/shipment.repository.ts`)**

```typescript
import { Shipment } from '../../domain/entities/shipment.entity';

// Dùng abstract class thay vì Interface để NestJS DI có thể nhận diện token được
export abstract class IShipmentRepository {
  abstract save(shipment: Shipment): Promise<void>;
  abstract findById(id: string): Promise<Shipment | null>;
}
```

**3. Application Use Case (`src/shipments/application/use-cases/create-shipment.use-case.ts`)**

```typescript
import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../ports/shipment.repository';
import { Shipment } from '../../domain/entities/shipment.entity';

// Được phép dùng @Injectable để tận dụng hệ sinh thái NestJS
@Injectable()
export class CreateShipmentUseCase {
  constructor(private readonly shipmentRepo: IShipmentRepository) {}

  async execute(cargoName: string, weight: number): Promise<Shipment> {
    // 1. Khởi tạo Entity (Business Logic)
    const shipment = new Shipment(
      crypto.randomUUID(),
      cargoName,
      weight,
      'PENDING',
    );

    // 2. Tương tác với hệ thống ngoài thông qua Interface
    await this.shipmentRepo.save(shipment);

    return shipment;
  }
}
```

**4. Infrastructure Repository (`src/shipments/infrastructure/repositories/prisma-shipment.repository.ts`)**

```typescript
import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../../application/ports/shipment.repository';
import { Shipment } from '../../domain/entities/shipment.entity';
// PrismaService là cái bạn đã viết ở DatabaseModule
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PrismaShipmentRepository implements IShipmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(shipment: Shipment): Promise<void> {
    // Infrastructure biết việc map từ Domain Entity xuống DB Model
    await this.prisma.shipmentModel.create({
      data: {
        id: shipment.id,
        cargoName: shipment.cargoName,
        weight: shipment.weight,
        status: shipment.status,
      },
    });
  }

  async findById(id: string): Promise<Shipment | null> {
    // Logic query DB nằm ở đây...
    return null;
  }
}
```

**5. Presentation Controller (`src/shipments/presentation/controllers/shipments.controller.ts`)**

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { CreateShipmentUseCase } from '../../application/use-cases/create-shipment.use-case';
import { CreateShipmentDto } from '../dtos/create-shipment.dto'; // Validations class-validator

@Controller('shiipments')
export class ShipmentsController {
  constructor(private readonly createShipmentUseCase: CreateShipmentUseCase) {}

  @Post()
  async create(@Body() dto: CreateShipmentDto) {
    // Chỉ parse input từ User, đá cho Use Case lo
    const result = await this.createShipmentUseCase.execute(
      dto.cargoName,
      dto.weight,
    );

    return { data: result };
  }
}
```

**6. Wiring trong Module (`src/shipments/shipments.module.ts`)**

```typescript
import { Module } from '@nestjs/common';
import { ShipmentsController } from './presentation/controllers/shipments.controller';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment.use-case';
import { IShipmentRepository } from './application/ports/shipment.repository';
import { PrismaShipmentRepository } from './infrastructure/repositories/prisma-shipment.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShipmentsController],
  providers: [
    CreateShipmentUseCase,
    // Dependency Injection: Khi ai cần IShipmentRepository, hãy đưa cho họ Prisma implementation
    {
      provide: IShipmentRepository,
      useClass: PrismaShipmentRepository,
    },
  ],
})
export class ShipmentsModule {}
```

---

### 7. Các lỗi thường gặp (Pitfalls) khi áp dụng tại NestJS

1.  **Lạm dụng Interface:** Tạo Interface cho Use Case như `ICreateShipmentUseCase`. _Lời khuyên:_ Đừng làm thế. Controller phụ thuộc trực tiếp vào class `CreateShipmentUseCase` là ổm rồi, vì Use Case có bao giờ thay thế implementation đổi DB đâu!
2.  **Tách layer quá vụn:** Chia cả `Repositories`, `Adapters`, `Models`, `Types` ra quá nhiều thư mục bé tí ti nhưng mỗi file chỉ có 2 dòng code.
3.  **Để Domain Entity dính líu đến DB:** Nghĩa là bạn gắn `@Table()` của TypeORM hoặc dùng thẳng generated model của Prisma làm Domain Entity. Hãy dũng cảm tách Class Entity riêng rẽ.
4.  **Application dính TypeORM/Prisma:** Imports PrismaClient vào thẳng UseCase. Nếu bạn làm thế, khi viết Unit Test bạn sẽ không thể mock được.
5.  **Nhầm lẫn giữa DTO, Entity và Model (Cực kì phổ biến):**
    - `DTO`: Chỉ dùng ở Controller để vứt bỏ rác/validate HTTP.
    - `Entity`: Dùng trong toàn bộ Use Case / Domain để quản lý luật.
    - `Data Model`: Chỉ dùng ở tầng Repository để nói chuyện với DB.
6.  **"Thùng rác" Service:** Giữ lại cái `shipments.service.ts` to đùng và cho mọi controller gọi nó. Hãy tách thành nhiều Use Case nhỏ (`CreateShipmentUseCase`, `UpdateShipmentStatusUseCase`).

---

### 8. Bác sĩ kê đơn: Roadmap & Checklist cho bạn

#### 📂 Cấu trúc thư mục hoàn tất (Blueprint):

```text
src/
├── app.module.ts
├── common/                  # (Shared) Global Filters, Interceptors (Logging, Errors)
├── database/                # (Infra shared) PrismaService
└── shipments/               # (Feature Module)
    ├── shipments.module.ts
    ├── domain/
    │   ├── entities/
    │   │   └── shipment.entity.ts
    │   └── exceptions/
    │       └── invalid-shipment-status.error.ts
    ├── application/
    │   ├── ports/
    │   │   └── shipment.repository.ts
    │   └── use-cases/
    │       ├── create-shipment.use-case.ts
    │       └── update-shipment-status.use-case.ts
    ├── infrastructure/
    │   └── repositories/
    │       └── prisma-shipment.repository.ts
    └── presentation/
        ├── controllers/
        │   └── shipments.controller.ts
        └── dtos/
            └── create-shipment.dto.ts
```

#### ☑️ Checklist Refactor (Cho 1 endpoint)

- [ ] Đã tạo xong `Class Entity` chưa hề chứa Decorator/Thư viện ngoài?
- [ ] Logic tạo/update Entity đã nằm **bên trong class Entity** đó chưa? (Encapsulation).
- [ ] Đã tạo `abstract class Repository` định nghĩa các hàm Input/Output chưa?
- [ ] Viết `UseCase` sử dụng Entity và Interface Repository đó. Khởi chạy thử, xem code có compile được chưa.
- [ ] Di chuyển Prisma query vào `PrismaRepository`. Map DB raw data sang `Entity` trước khi `return`.
- [ ] Cấu hình trong mảng `providers` của Module để NestJS tự động bind Injection.
- [ ] Gõ `npm run test` trên cái `UseCase` để thử nghiệm sức mạnh của Clean Architecture (Mock DB 1 dòng).

#### 🛣️ Roadmap Refactor không gãy đổ hệ thống

- **Tháng 1:** Đừng sửa code cũ! Hãy áp dụng cấu trúc mới này cho **một API/Tính năng MỚI HOÀN TOÀN** (Ví dụ: Module Port). Để team làm quen với khái niệm UseCase thay vì Service dài ngoằng.
- **Tháng 2:** Tìm 1 endpoint cũ **đơn giản nhất** (vd: Lấy chi tiết chuyến hàng) để refactor. Có thể chạy song song `shipments.service.ts` (cũ) và `get-shipment.use-case.ts` (mới).
- **Tháng 3:** Sau khi quen tay, chia nhỏ cái `ShipmentService` lớn thành từng Use Case một và rút gọn dần cái Service cũ ấy đến khi xóa hẳn.

Đây là phương pháp "Strangler Fig" – vây ép và bóp nghẹt code cũ dần dần, hệ thống của bạn vẫn chạy trơn tru 100% trên Fastify mỗi lúc bạn đẩy code lên Git. Nếu gặp khó trong việc Mock Prisma, đừng ngại hỏi tiếp nhé!
