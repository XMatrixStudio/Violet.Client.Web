<template>
  <div id="login">
    <Form :model="formItem">
      <FormItem prop="user">
        <Input type="text" v-model="formItem.user" placeholder="Username">
          <span slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formItem.password" placeholder="Password">
          <span slot="prepend"><i class="fa fa-key" aria-hidden="true"></i></span>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    }
  }
</script>

