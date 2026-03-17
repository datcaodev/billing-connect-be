

-- lệnh tạo db
-- đăng nhập vào postgree
 psql -h 113.161.103.134 -p 9000 -U postgres


-- các bước tạo master data
-- b1: tạo client + tài khoản admin (add mật khẩu) trên keycloak
-- b1.1: tạo realm + client dịch vụ trên keycloak
-- b2: tạo add thông tin client (dịch vụ) masterdata bằng api thêm mới dịch vụ

      -- b3: thêm mapping nhóm quyền admin
INSERT INTO group_permission (
  guid_keycloak,
  name,
  user_id,
  parent_group_id,
  service_code,
  created_at,
  updated_at
) VALUES (
  '47cca3f2-547c-44e2-8c7f-8bfac24845d3',
  'SUPPER ADMIN',
  1,
  '47cca3f2-547c-44e2-8c7f-8bfac24845d3',
  'CDP_ADMIN',
   NOW(),
   NOW()
);


-- b4: thêm mới thông tin tài khoản admin hệ thống vào db
-- note1: service_code => lấy từ bảng service
-- note2:  user_guid => lấy từ keycloak
-- note2:  user_name => lấy từ keycloak
-- note2:  email => lấy từ keycloak
INSERT INTO account (
  guid,
  full_name,
  email,
  address,
  phone,
  user_name,
  account_type,
  user_guid,
  unit_id,
  is_deleted,
  service_code,
  status,
  created_at,
  updated_at,
  user_create
) VALUES (
  'ae963220-de31-4c6a-abfb-7ad5f910c2f6',          
  'Cao Đạt',                 
  'datcao@gmail.com',         
  'tòa 3a, ngõ 82 duy tân',     
  '0354492575',               
  'datcao',                  
  1,                    
  'ae963220-de31-4c6a-abfb-7ad5f910c2f6',         
  null,                         
  false,                      
  'CDP_ADMIN',                
  1,                    
  NOW(),                       
  NOW(),                      
  null                     
);

-- -- b4: thêm mới thông tin tài khoản admin hệ thống kiểm duyệt vào db
-- -- note1: service_code => lấy từ bảng service
-- -- note2:  user_guid => lấy từ keycloak
-- -- note2:  user_name => lấy từ keycloak
-- -- note2:  email => lấy từ keycloak
-- INSERT INTO account (
--   guid,
--   full_name,
--   email,
--   address,
--   phone,
--   user_name,
--   account_type,
--   user_guid,
--   unit_id,
--   is_deleted,
--   service_code,
--   status,
--   created_at,
--   updated_at,
--   user_create
-- ) VALUES (
--   '3ae98c51-c161-4c24-8cd6-4447a5dfa962',
--   'Cao Đạt',
--   'moderation@gmail.com',
--   'tòa 3a, ngõ 82 duy tân',
--   '0354492575',
--   'adminmoderation',
--   4,
--   '3ae98c51-c161-4c24-8cd6-4447a5dfa962',
--   null,
--   false,
--   'MODERATION',
--   1,
--   NOW(),
--   NOW(),
--   null
-- );


-- b4: insert master data publisher_type table
INSERT INTO publisher_type (guid, name, description, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Báo điện tử', 'Đơn vị xuất bản nội dung tin tức, bài viết qua nền tảng số (website, app)', now(), now()),
  (gen_random_uuid(), 'Truyền hình', 'Đơn vị sản xuất, phát sóng nội dung hình ảnh và âm thanh qua truyền hình hoặc nền tảng số', now(), now());