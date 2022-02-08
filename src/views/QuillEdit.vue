<template>
  <div class="word-edit">
    <el-upload
      class="avatar-uploader"
      id="quill-upload"
      action=""
      accept="image/jpg, image/jpeg, image/png, image/gif"
      :http-request="upload"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :show-file-list="false"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form ref="form" :rules="rules" :model="addForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div class="content">
          <quillEditor
            v-model="addForm.content"
            :options="editorOption"
            ref="QuillEditor"
          ></quillEditor>
        </div>
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" @click="saveForm">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { quillEditor } from "vue-quill-editor";

import { Form } from "element-ui";
import { addQuillTitle } from "../utils/editor/addTitle";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

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
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入博客标题", trigger: "blur" }],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      addForm: {
        title: "",
        content: ""
      },
      editorOption: {
        placeholder: "请输入编辑内容",
        theme: "snow", //主题风格
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  (
                    document.querySelector("#quill-upload input") as any
                  ).click();
                } else {
                  (this.quill as any).format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  mounted() {
    addQuillTitle();
  },
  methods: {
    async saveForm() {
      try {
        ((this.$refs as any).form as Form).validate((valid) => {
          console.log(valid);
        });
        const content = (this.addForm as any).content;
        console.log(content);
      } catch (err) {
        console.log(err);
      }
    },
    // 上传图片前
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        (this.$message as any).error("支持JPG、PNG格式的图片，大小不得超过1M");
      }
      if (!isLt1M) {
        (this.$message as any).error("文件最大不得超过1M");
      }
      return isJPG && isLt1M;
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      console.log(res);
      let quill = (this.$refs.QuillEditor as any).quill;
      let length = quill.getSelection().index;
      //quill.insertEmbed(length, "image", url);
      quill.setSelection(length + 1);
    }
    // 上传图片失败
    // 上传图片处理过程
    // uploadFile() {
    //   var file = (document.getElementById("file") as any).files[0];
    //   if (!file) {
    //     this.$message.error("请选择图片");
    //     return;
    //   }
    //   var formData = new FormData();
    //   formData.set("file", file);
    //   this.$http.post("/upload/single", formData).then((res) => {
    //     console.log(res);
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.quill-editor /deep/ .ql-editor {
  min-height: 400px;
}
.content {
  display: inline-block;
  width: 100%;
}
.btn-group {
  margin-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
  }
}
</style>
