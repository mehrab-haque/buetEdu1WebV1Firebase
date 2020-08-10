import axios from 'axios'

export const loginRedux=(dispatcher)=>{
  axios.get('https://o4qqcaphlj.execute-api.ap-south-1.amazonaws.com/demo?fbclid=IwAR2HUAaUx6rWNpo4WQihJl8Y_ThsLihG_X9T0IXdRyp0QAw9Fj02AbKihzI').then(res=>{
    dispatcher(loginDispatch())
  }).catch(err=>{
    console.log(err)
  })

}

const loginDispatch=()=>{
  return {
    type:'SIGN_IN'
  }
}
