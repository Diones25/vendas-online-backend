import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "category_id", nullable: false })
  categoryId: number;

  @Column({ name: "price", nullable: false })
  price: number;

  @Column({ name: "image", nullable: false })
  image: string;

  @Column({ name: "created_at", })
  createdAt: Date;

  @Column({ name: "updated_at", })
  updatedAt: Date;

  @OneToMany(() => CartProductEntity, (cartProduct: CartProductEntity) => cartProduct.product)
  cartProducts?: CartProductEntity[];

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.products)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category?: CategoryEntity;
}