import {
  Grid,
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Discountt = () => {
  const testText =
    '<h2 class="ql-align-center"><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/1200-400-max-eximbank.png"></h2><h3 class="ql-align-center">GIẢM 1 TRIỆU KHI THANH TOÁN IPHONE 15 SERIES BẰNG THẺ TÍN DỤNG EXIMBANK</h3><p class="ql-align-justify"><strong style="color: rgb(54, 54, 54);">1. Thời gian chương trình:</strong><span style="color: rgb(0, 0, 0);">&nbsp;29/09/2023-28/02/2024</span></p><p class="ql-align-justify"><strong style="color: rgb(54, 54, 54);">2. Số lượng:</strong><span style="color: rgb(0, 0, 0);">&nbsp;500 suất&nbsp;</span></p><ul><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Áp dụng cùng với các ưu đãi đặt hàng hoặc các ưu đãi hiện hành của CellphoneS</span></li><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Áp dụng cho Khách hàng mua và thanh toán bằng thẻ tín dụng Eximbank tại các cửa hàng ;CellphoneS trên Toàn quốc, các đầu BIN áp dụng: 423960; 404152; 418159; 436308; 469655; 402737; 548370; 542853; 527559; 536302; 356680; 356681; 356513; 403754; 558023;</span></li><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Chương trình chỉ áp dụng cho khách mua hàng với nhu cầu chi tiêu cá nhân (không hợp thức hoá xuất VAT công ty);</span></li><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Chỉ áp dụng cho khách hàng thanh toán 100% giá trị đơn hàng (sau khi trừ khuyến mãi và số tiền đặt cọc) qua thẻ tín dụng Eximbank;</span></li><li class="ql-align-justify"><strong style="color: rgb(0, 0, 0);">Chương trình chỉ áp dụng cho khách hàng là người dùng cuối, Cửa hàng từ chối áp dụng chương trình cho khách hàng mua đi bán lại hoặc nhằm mục đích thương mại khác. Áp dụng cho tối đa 2 sản phẩm đối với một số điện thoại mua hàng hoặc một khách hàng trên toàn hệ thống Cửa hàng CellphoneS (Mỗi khách hàng chỉ được sử dụng một số điện thoại để mua hàng trong chương trình)</strong></li></ul><p class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Lưu ý:&nbsp;</span></p><ul><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Áp dụng cho khách hàng trả thẳng hoặc trả góp 0%</span></li><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Mỗi chủ thẻ chỉ nhận được ưu đãi 1 lần trong suốt chương trình</span></li><li class="ql-align-justify"><span style="color: rgb(0, 0, 0);">Không áp dụng cùng ưu đãi trả góp qua MPOS.</span></li></ul><p><br></p>';
  return (
    <>
      <Grid
        container
        sx={{
          maxWidth: "1250px",
          backgroundColor: "#eeebeb",
          display: "flex",
          margin: "auto",
          marginTop: "8px",
        }}
      >
        <Grid item xs={12}>
          <Toolbar
            sx={{
              flexDirection: "column",
              margin: "10px",
              backgroundColor: "#eeebeb",
              borderRadius: "10px",
              boxShadow: (theme) => theme.shadows[3],
              display: "flex",
            }}
          >
            <Typography
              variant="h5"
              sx={{ width: "auto", marginTop: "10px", fontWeight: "bold" }}
            >
              Siêu sale 11.11
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: testText }} />
            <MyRichTextEditor />
          </Toolbar>
        </Grid>
      </Grid>
    </>
  );
};

const MyRichTextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const fontOptions = ["Arial", "Times New Roman", "Verdana"];
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"]

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleEditorChange = (content) => {
    setEditorContent(content);
    console.log(JSON.stringify(content));
  };
  const handleSave = () => {
    // Làm điều gì đó với nội dung đã chỉnh sửa, ví dụ: lưu lên máy chủ
    console.log("Nội dung đã chỉnh sửa:", editorContent);
  };

  return (
    <div>
      <ReactQuill
        modules={module}
        theme="snow"
        value={editorContent}
        onChange={handleEditorChange}
      />
      <div className="ql-editor">
        <Card sx={{my: 3}}>
          <CardMedia
            component="img"
            image="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/sliding-dienthoai-xiaomi-13c.jpg"
            sx={{ maxHeight: "512px", objectFit: "contain"}}
          />
        </Card>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>

    </div>
  );
};
export default Discountt;
