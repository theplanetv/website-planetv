# Tại sao ibus-bamboo lại tệ? 

Mặc dù là 1 người đóng góp khá mới và cũng như với ibus-bamboo nhưng mình lại nhận ra rằng ibus-bamboo không thực sự hoàn hảo đến thế và nó có rất nhiều vấn đề xoay quanh nó. Trước khi đề cập thêm mình xin phép đính chính rằng việc phát triển phần mềm rất là khó khăn đặc biệt khi các nhà phát triển đều làm việc bán thời gian và nó chủ yếu là sở thích thay vì được trả tiền để phát triển chúng, bài viết này không nhằm công kích bất kỳ cá nhân nào mà thay vào đó mình chỉ muốn tập trung vào vấn đề chính mà ibus-bamboo hiện gặp phải. 

## Lịch sử của Input method ở Linux 

Trước khi vô vấn đề chúng ta tìm hiểu 1 chút về lịch sử input method. Cho đến khi Fcitx5 ra đời thì Ibus vẫn là giải pháp phù hợp nhất và dễ sử dụng cũng như phát triển cho bạn 1 input method. Thời điểm đó fcitx (phiên bản viết bằng C trước đó của fcitx5 khá là tệ theo 1 số ý kiến và có vẻ nó đã được bảo lưu) mọi chuyện chỉ xoay chiều khi fcitx5 thực sự ra đời và nó viết bằng C++, 1 ngôn ngữ có nhiều tính năng hơn C và cả chục công cụ tiêu chuẩn tốt để bạn có thể thoải mái chọn lựa. Cùng với đó là sự hỗn loạn mã nguồn của Xorg cùng hy vọng Wayland sẽ chuẩn hóa lại graphical protocol. Fcitx5 được cộng đồng đóng góp trau truốt đã đi lên như 1 input method hoàn hảo cho đến hiện tại. Và chà chúng ta hãy nhìn xem những gì Ibus không có và Fcitx5 có nhé. 

## So sánh Ibus và Fcitx5 

Mình sẽ so sánh những khía cạnh đơn giản nhất 1 phần vì mình khá là ngu ngốc để có thể hiểu sâu :P và phần 2 thì không ai muốn đọc dài dòng nên chúng ta hãy dựa vào bảng sau để phân tích. 

| |Ibus|Fcitx5|
|-|-|-|
|Tài liệu|Hơi ít và phụ thuộc vào đọc mã nguồn nhiều|Có tốt hơn ibus nhưng không thực sự hoàn hảo|
|Cộng đồng|Ít hơn (không chắc chắn về việc có kênh chat)|Nhiều và sôi nổi bên Telegram|
|Viết bởi|nhà phát triển GNOME|nhà phát triển KDE| 
|Hỗ trợ Wayland|Đủ dùng trên Gnome|Tốt trên các DE và WM|
|Hỗ trợ UI cho engine tự viết|Không|Có|

## Vấn đề của ibus-bamboo 

Mình sẽ liệu kê 1 danh sách của chính bản thân ibus-bamboo mà các bạn có thể tham khảo

+ Phụ thuộc vào ibus: việc phụ thuộc vào input method như Ibus ở nhiều ở thời điểm của Wayland đang lên ngôi khiến cho dự án bị trì hoãn đang trở nên khá trầm trọng. Mình thực sự không biết phải bắt đầu từ đâu về vấn để này có vẻ như việc cải thiện Ibus là việc nên làm nếu ibus-bamboo vẫn còn muốm sốbng tiếp.
+ Lệ thuộc vào code C: mình đã có đề cập đến chuyện này tuy vậy code C trong Xorg và phần UI của ibus-bamboo cho phím tắt là vấn đề chính mình thấy khiến mã trở nên khó khăn hơn trong việc đọc code và duy trì cũng như đưa qua các nền tảng khác như BSD chẳng hạn.
+ goibus: thực ra goibus thư viện ibus-bamboo đang xài để tương tác với Ibus cần phải tạo 1 wrapper bọc C API của Ibus thay vì tương tác thông qua Dbus khiến cho nó trở nên tệ hại khi ở Wayland tính năng chuyển chế độ gõ đã bị vô hiệu hóa.
+ Wayland: Phải vấn đề grab wm trên Wayland thư viện wl mà ibus-bamboo đang sử dụng chỉ là 1 dự án đồ chơi vui vẻ của 1 người khác và để có thể hiện thực hóa Wayland với ibus-bamboo. Hiện tại thì ai đó cần phải cầm lấy công việc và duy trì nó.

Vậy bản thân ibus-bamboo có quá nhiều vấn đề với các dự án đang phụ thuộc? Đúng là như vậy và thật đáng tiếc bản thân mình không còn đủ động lực hay sức mạnh để thúc đẩy tiếp.

## Vấn đề của bản thân

Sử dụng Ibus trên Wayland là 1 cực hình đối với mình. Ngoài GNOME ra thì đa phần những thứ khác đều hoạt động do hên xui. Yếu tố icon tray của Ibus không hoạt động trên eww chính là yếu tố mình muốn ly dị ibus và ibus-bamboo ngay lập tức.

## Kết luận 

Mình là người đáng bị chỉ trích? Có vẻ nên là như vậy khi mình muốn duy trì làm 1 maintainer chính của ibus-bamboo nhưng rồi lại từ chối khước từ chính bản thân nó và cảm thấy người nên cần phải xem xét lại là bản thân mình, mình cảm thấy khá buồn khi Ibus hiện không có được thứ mà các nhà phát triển cần để trau truốt và bản thân ibus-bamboo lại có nhiều vấn để từ lựa chọn trong quá khứ của dự án.

Vậy hướng đi mới cho bất cứ ai có ý định làm 1 engine trong input method trong Linux là gì? Bạn nên chọn những ngôn ngữ có khả năng tương thích với dự án hoặc 2 là hãy bọc 1 wrapper API cho fcitx5 hay ibus trước khi bạn muốn làm gì đó. Về phần bản thân mình có lẽ mình sẽ dạt tới fcitx5-bamboo 1 thời gian.

Dù sao cảm ơn đã lắng nghe. Chúc bạn có 1 ngày thật tốt.
