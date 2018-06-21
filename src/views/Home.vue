<template>
    <el-form :model="formData"  :rules="rules"  ref="forms" style="color:#fff;">
        <!-- <el-form-item label="手机号"  prop="tel" validateState="error">
            <input type="tel"  maxlength="11"  v-model.trim="formData.tel" style="color:#000;" />
        </el-form-item> -->
        <el-form-item prop="account">
            <el-input type="text" v-model="formData.tel" auto-complete="off" placeholder="账号" :maxlength="11"></el-input>
        </el-form-item>
        <button @click="handleSubmit" style="color:#fff;">保存</button>
    </el-form>
</template>
<script>
    import  { 
         ElForm,
         ElFormItem 
    }  from  '@/common/Form'  
    export  default  {    
        data ()  {      
            return  {        
                formData:  {          
                    tel:   ''        
                },
                rules:  {          
                    tel:  [            
                        // {
                        //     required:  true,
                        //      message:   '您的手机号码未输入'
                        // },              {
                        //     pattern:   /^1[34578]\d{9}$/,
                        //      message:   '您的手机号码输入错误'
                        // }   
                       {
                            required: true,
                            message: '请输入11位手机账号',
                            trigger: 'blur',
                            min: 11, 
                            max: 11,
                        }     
                    ]        
                }  
            //     account: [,],    
            }    
        },
        methods:  {      
            handleSubmit ()  {      
                this.$refs.forms.validate(value => {
                    console.log(999)
                    console.log(value)
                })      
            }    
        },
        components:  {      
            ElForm,
         ElFormItem   
        }  
    }
</script>
