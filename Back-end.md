 # Back-End Gereksinimleri ve Tasarımları
 
 Docker kullanılmadı , REST API kullanıldı

 # İşlevler

## 1. Kayıt Ol (Sign Up)
**İşlevsellik**: Yeni kullanıcıların hesap oluşturmasını sağlar.

## 2. Giriş Yap (Sign In)
**İşlevsellik**: Mevcut kullanıcıların hesaplarına giriş yapmasını sağlar.

## 3. Makale Ekleme (Makale ekleme)
**İşlevsellik**: Kullanıcıların yeni makale eklemesine olanak tanır.

## 4. Makale Silme (Makale silme)
**İşlevsellik**: Kullanıcıların mevcut makaleleri silmesini sağlar.

## 5. Makale Düzenleme (Makale düzenleme)
**İşlevsellik**: Kullanıcıların mevcut makaleleri düzenlemesini sağlar.

## 6. Makale Görüntüleme (Makale görüntüleme)
**İşlevsellik**: Kullanıcıların belirli bir makaleyi görüntülemesini sağlar.

## 7. Makale Listeleme (Makale listeleme)
**İşlevsellik**: Kullanıcıların tüm makaleleri liste halinde görmesini sağlar.

## 8. Makale Beğenme (Makale beğenme)
**İşlevsellik**: Kullanıcıların makaleleri beğenmesine olanak tanır.

## 9. Favoriye Ekleme (Favoriye ekleme)
**İşlevsellik**: Kullanıcıların makaleleri favori listelerine eklemesine olanak tanır.

## 10. Puan Verme (Puan verme)
**İşlevsellik**: Kullanıcıların bilim adamı makalelerine puan vermesine olanak tanır.



# CONTROLLERS:

 AuthController (Kimlik Doğrulama İşlemleri):
Kullanıcı kayıt, giriş ve çıkış işlemlerini yönetir. Kullanıcı şifrelerini güvenli hale getirir, kullanıcı oturumlarını yönetir ve güvenli tokenler oluşturur.

 ScientistController (Bilim İnsanları İşlemleri):
Bilim insanlarıyla ilgili CRUD (Create, Read, Update, Delete) işlemlerini ve kullanıcı favorileri ile puanlama işlemlerini gerçekleştirir. Bilim insanı verilerini ekler, günceller, siler ve getirir.

 UploadController (Dosya Yükleme İşlemleri):
Dosya yükleme işlemlerini yönetir. Yüklenen dosyaları Cloudinary gibi bir bulut hizmetine yükler ve dosya URL'lerini döner.

# ROUTES:

authRoutes.js : 
 Kimlik doğrulama işlemleri için rotalar tanımlar

scienceRouter.js :
 Yazılan makaleler hakklnda işlemeliri için rotalar tanımlar

# MODELS:

 AuthModel.js:
   Kullanıcı için veri modeli tanımlar

 Scientist.js: 
   Makale için veri modeli tanımlar


# MIDLLEWARE:

  validationMiddleware.js:
   Makaleler için gerekli özelliklerin tanımlanmasını içerir ( boş olmaması, boş olmasl durumda çıkan uyarı ve s..)

  
  

 




