<template>
    <v-form :model="formData"  :rules="rules"  ref="forms" style="color:#fff;">
        <form-item label="手机号"  prop="tel" validateStatus="error">
            <input type="tel"  maxlength="11"  v-model.trim="formData.tel" style="color:#fff;" />
        </form-item>
        <button @click="handleSubmit" style="color:#fff;">保存</button>
    </v-form>
</template>
<script>
    import  { 
        VForm,
         FormItem 
    }  from  '@/common/Form'  
    export  default  {    
        data ()  {      
            return  {        
                formData:  {          
                    tel:   ''        
                },
                rules:  {          
                    tel:  [            
                        {
                            required:  true,
                             message:   '您的手机号码未输入'
                        },              {
                            pattern:   /^1[34578]\d{9}$/,
                             message:   '您的手机号码输入错误'
                        }          
                    ]        
                }      
            }    
        },
        methods:  {      
            handleSubmit ()  {        
                this.$refs.forms.validate(errs  =>  {          
                    console.log(errs)        
                })      
            }    
        },
        components:  {      
            VForm,
            FormItem    
        }  
    }
</script>
