import { loginIntercepts } from './loginIntercepts'
import { blockedIntercepts } from './blockedIntercepts'
import { cartOrderIntercepts } from './cartOrderIntercepts'
import { detailCatalogIntercepts } from './detailCatalogIntercepts'
import { othersIntercepts } from './othersIntercepts'
import { registrationIntercepts } from './registrationIntercepts'
import { wishlistIntercepts } from './wishlistIntercepts'
import { passwordIntercepts } from './passwordIntercepts'
import { userAccountIntercepts } from './userAccountIntercepts'

export function intercepts() {
  loginIntercepts()
  blockedIntercepts()
  cartOrderIntercepts()
  detailCatalogIntercepts()
  othersIntercepts()
  registrationIntercepts()
  wishlistIntercepts()
  passwordIntercepts()
  userAccountIntercepts()
}
