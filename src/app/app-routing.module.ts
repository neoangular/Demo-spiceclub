import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './layout/banner/banner.component';
import { MainpageComponent } from './layout/mainpage/mainpage.component';
import { MainComponent } from './main/main.component';
import { AllbrandsComponent } from './products/allbrands/allbrands.component';
import { AllcategoryComponent } from './products/allcategory/allcategory.component';
import { FeaturedComponent } from './products/featured/featured.component';
import { RecipeComponent } from './products/recipe/recipe.component';
import { SearchedComponent } from './products/searched/searched.component';
import { SelershopComponent } from './products/selershop/selershop.component';
import { ShopbyproductComponent } from './products/shopbyproduct/shopbyproduct.component';
import { TopbrandsComponent } from './products/topbrands/topbrands.component';
import { ShippingcostComponent } from './shipping/shippingcost/shippingcost.component';
import { SignupComponent } from './signup/signup.component';
import { AddressComponent } from './store/address/address.component';
import { CartComponent } from './store/cart/cart.component';
import { ConvertationComponent } from './store/convertation/convertation.component';
import { FeedbacksComponent } from './store/feedbacks/feedbacks.component';
import { MessageComponent } from './store/message/message.component';
import { OrdersComponent } from './store/orders/orders.component';
import { ProfileComponent } from './store/profile/profile.component';
import { WalletComponent } from './store/wallet/wallet.component';
import { WishlistComponent } from './store/wishlist/wishlist.component';

const routes: Routes = [
  { path: 'login', component: HomeComponent },
  { path: 'Signup', component: SignupComponent },
   { path: 'main', component: MainComponent },
   { path: 'forgot', component: ForgotComponent },
  { path: '',   redirectTo: '/banner', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'allbrands', component: AllbrandsComponent },
  { path: 'topbrands', component: TopbrandsComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'address', component: AddressComponent },
  { path: 'shippingcost', component: ShippingcostComponent },
  { path: 'featuredproduct', component: FeaturedComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'allcategory', component: AllcategoryComponent },
  { path: 'shopbyproduct', component: ShopbyproductComponent },
  { path: 'searchproduct', component: SearchedComponent },
  { path: 'sellershop', component: SelershopComponent },  
  { path: 'wallet', component: WalletComponent },
  { path: 'Recipe', component: RecipeComponent },
  { path: 'feedbacks', component: FeedbacksComponent },
  { path: 'message', component: MessageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'convertation', component: ConvertationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
