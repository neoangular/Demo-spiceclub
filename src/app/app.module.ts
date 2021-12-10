import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotComponent } from './forgot/forgot.component';
import { AllbrandsComponent } from './products/allbrands/allbrands.component';
import { TopbrandsComponent } from './products/topbrands/topbrands.component';
import { MainpageComponent } from './layout/mainpage/mainpage.component';
import { BannerComponent } from './layout/banner/banner.component';
import { CartComponent } from './store/cart/cart.component';
import { WishlistComponent } from './store/wishlist/wishlist.component';
import { AddressComponent } from './store/address/address.component';
import { ShippingcostComponent } from './shipping/shippingcost/shippingcost.component';
import { FeaturedComponent } from './products/featured/featured.component';
import { BestsellingComponent } from './products/bestselling/bestselling.component';
import { OrdersComponent } from './store/orders/orders.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AllcategoryComponent } from './products/allcategory/allcategory.component';
import { CategoryComponent } from './products/category/category.component';
import { ShopbyproductComponent } from './products/shopbyproduct/shopbyproduct.component';
import { SearchedComponent } from './products/searched/searched.component';
import { SelershopComponent } from './products/selershop/selershop.component';
import { WalletComponent } from './store/wallet/wallet.component';
import { RecipeComponent } from './products/recipe/recipe.component';
import { FeedbacksComponent } from './store/feedbacks/feedbacks.component';
import { MessageComponent } from './store/message/message.component';
import { ProfileComponent } from './store/profile/profile.component';
import { ConvertationComponent } from './store/convertation/convertation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    MainComponent,
    ForgotComponent,
    AllbrandsComponent,
    TopbrandsComponent,
    MainpageComponent,
    BannerComponent,
    CartComponent,
    WishlistComponent,
    AddressComponent,
    ShippingcostComponent,
    FeaturedComponent,
    BestsellingComponent,
    OrdersComponent,
    AllcategoryComponent,
    CategoryComponent,
    ShopbyproductComponent,
    SearchedComponent,
    SelershopComponent,
    WalletComponent,
    RecipeComponent,
    FeedbacksComponent,
    MessageComponent,
    ProfileComponent,
    ConvertationComponent,
    
  ],
  imports: [
    BrowserModule,CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,ArchwizardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
