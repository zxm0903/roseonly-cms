<template>
  <el-dialog title="发货" :visible.sync="dialog.bool" width="30%" :before-close="handleClose">
    <el-form label-position="left" ref="form" :model="form" label-width="80px">
      <el-form-item label="快递">
        <el-select v-model="form.region" placeholder="请选择快递">
          <el-option label="申通" value="shanghai"></el-option>
          <el-option label="圆通" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号">
        <el-input v-model="form.color"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog.bool = false">取 消</el-button>
      <el-button type="primary" @click="consign(dialog.row.orderDetailId)">确认发货</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  },
  props: ["dialog"],
  methods: {
    handleClose(done) {

          done();

    },
    consign(id){
      this.dialog.bool = false
      let that = this
      this.axios.post('/orders/delivery/'+ id,{
        admin:1
      })
      .then(res => {
        console.log(res)
        
         if(res.data.code == 200){
            location.reload()
          }
      })
    }
  }
};
</script>
