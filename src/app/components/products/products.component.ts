import { ProductsService } from './../../service/products.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';



interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Electronics',
    children: [
      { name: 'Tv' },
      { name: 'Smartphones' },
      { name: 'Watches' },
    ]
  }, {
    name: 'Bulk Category',
    children: [
      { name: 'Chair' },
      { name: 'Beds' },
      { name: 'Furnitures' },
      { name: 'Others' }
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }



  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }


  public allproducts: any;
  // public newProducts:any;

  constructor(private productService: ProductsService) {
    this.dataSource.data = TREE_DATA;
    this.productService.getAllProducts().subscribe((res) => {
      this.allproducts = res.allProducts;
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }



  addToCart(id:any){
    console.log(typeof(id));
    this.productService.getSingleProduct(id).subscribe((res)=>{
      console.log(res[0]);
      this.productService.setItems(res[0]);
      this.productService.totalCost(res[0]);
      this.productService.cartNumbers(res[0]);
      this.productService.getCartNumber();
      this.productService.getCartProducts();
    })
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
