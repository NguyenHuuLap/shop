import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PageMetadata = () => {
  useEffect(() => {
    const currentURL = window.location.href;

    // Kiểm tra URL và cập nhật title và icon tương ứng
    if (currentURL.includes('/')) {
      document.title = 'Trang chủ';
      const icon = document.querySelector('link[rel="icon"]');
      icon.href = '../../../assets/images/logo/logo.png'; // Đường dẫn tới icon của trang chủ
      console.log(icon);
    } else if (currentURL.includes('/about')) {
      document.title = 'Về chúng tôi';
      const icon = document.querySelector('link[rel="icon"]');
      icon.href = '"../../../assets/images/logo/logo.png"'; // Đường dẫn tới icon của trang về chúng tôi
    } else {
      document.title = 'Trang không tồn tại';
      const icon = document.querySelector('link[rel="icon"]');
      icon.href = '"../../../assets/images/logo/logo.png"'; // Đường dẫn tới icon mặc định
    }
  }, []);

  return (
    <Helmet>
      {/* Các thẻ meta khác */}
      {/* ... */}
    </Helmet>
  );
};

export default PageMetadata;