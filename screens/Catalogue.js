import React from 'react';
import { FlatList, StyleSheet, Text, View,Image } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../component/MyHeader';
import {styles} from '../component/Styles';

const list = [
    {
    name: 'Shirt',
    avatar_url: 'data:image/jpeg;base64,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',
    subtitle: 'Cotton Shirts'
  }
]

const list1 = [
  {
    name: 'Pant',
    avatar_url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIRERUREBIVEhUWEhcVFxUVFRUYFxgTFhYXGBcTFRUYHSggGBomGxUXITIhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGC0eHSUtLS0tLi0tLS0tLS0tLS0tLS0rKysrLS01LS0tLS0tLS0tKy0rLSsrLS0tLSstLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xABCEAACAQICBgcFBgMGBwAAAAAAAQIDEQQhBQYSMUGBEyJRYXGRoQcyQrHRI1JygpLBU2LCF2Oy4vDxFBYzQ1TS4f/EABgBAQEBAQEAAAAAAAAAAAAAAAACAQME/8QAGxEBAQEAAwEBAAAAAAAAAAAAAAECAxExIRL/2gAMAwEAAhEDEQA/ALJAAAAAAAAAAAAAAABIsN7kfwr5HpZKxiwU/s4/hXoe51FbfYDFNXZ8dM+OcPv2PSqR4Ti+aL7U+KAie7qW5+QcbDsaGLz3G3hcOqcc11nva+R8w9C8nJ7k8vEzVo3ZntKx1qiSyvdmhN75Ph/qxmrTz9DTxNVPqx3fuKxgbuACWAAAAAAAAAAAAAAAAAAAAAAAAMWs2JqU8DGpSnKEo1PejbJNyWaaaaz3MrPSHtIx2Hko3hVvm3Omt/Ytlrf4lkaSn0lPoJe402+3aureFt/MqXTuhoTr7N5TjCWezFxa7tq77XwQ7XM3pk/tI0hWqwi6qpRc1FqnCCybt70tqXqcDSmseNlOUamKqu0nGzqStk2t1yS0NWcNk40asnw+0tn25m/S1cjdydOmnJttyW1LPvdl5Iztv5rmaOx9F08M3Up7W2+kjGylb705LN8zpYXH6Rr4hrB4itSw6qJOpNt0owv1nFVU1K2eSXkdbRujMNCrThVipyntSjG3VtBdZtfdSfHi13I6ek8Zk1DJJWS7u4jfL068fB+vtqwcO4qnFRltrZSUrp3st7aybMdersorLRWla1Of2U2s7uLzi+5x8OKs+8kujdPf8U6icdl05KLSd79+5WzTyKxySxHJxXDp16+14GEApxAAAAAAAAAAAAAAAAAAAAAAAAADHXdovwA0J1utLsv+yaOJg6LhBtW60nJ8c33vwOjOpnLvX7bzQq4zYsrXRLu+JSe6du6yRhqYhJ2395jr4ynL3XaXYcuvXcc2wOqtMxjU2Ek24qCl4u7j4Oy8kfZzb5kUqVLu+46FDTNk+k4RytvnJu3082zjyY7+vRxckk6rZxuMWG6745Jdslu/+mvqTpCccXG7uqrlGd+1pyT/AFJeZHcfj5VZ7U2u77sV2R7fE7Gpsb4ulsqT697tcErsvGenHl3+lsgA6vMAAAAAAAAAAAAAAAAAAAAAAAAGjpiqo07N22na+dub4czeOVpudrZ2yfr/ALGVWfXAq4pwdpO64X3+F+KNCriNqT8T5jms0pJdzts+XDlY5tDFvacZLw4prufEx1bWJSfvK38yNGomuO0jfk1a8X4pmhUkBryzPEqae/MyM+MMaiSXBX+ZLvZ1RTrVJ292mkvzP/K/MiNZ5snPs0d4VuPWgudpeuaEZrxNAAU5AAAAAAAAAAAAAAAAAAAAAAAABHtZINy96SSjwaS48bX9SQkY1k/6jur5L5GVePUVxdD++fOrH6nFxlLYe1Fxune+3F/JnaxjjxcV/ruOTi0rO1/02XqYtuYWv0kFJcd67+KMdV5nN0NidibpvdLd+JfVfI6mIiGsdjxUeR9TPM2BqVid+zJR6Os/j24pq/wpPZdvFyz7iDVicezSS2a0bZ3g1Lti9rq8mn5iJ14mwAKcgAAAAAAAAAAAAAAAAAAAAAAAAi2sT+1ls70lk925b770SkiWtD+0fL/CjKvHqMYms/4lu6EEvVfU5NfN3d33ybbOjiqnYc6s883cxbkY1NSTWTTuvFEipV1Upxl2r14rzOHjIXJgtAdDgKFVJ3l1p9yqZw8MkvMDjHiZ6mj4g1gqEz9mlV3rQ+FqM13O7TXr6EOqEn9nFS2IqQvlKk2l2tSj9QnXixAAU5AAAAAAAAAAAAAAAAAAAAAAAABCtbKv20vCP+FE1K31iq7Vap+OXzskZV4cetK5qVTPI16pi33AYN1qsILfKaiubtflvLhxuCjUoyo7k4bK7rLq+TS8iBez3CbWIc2soQb/ADS6q9G/Isc2I1fqnq8XFtPJp2a7Gt6MEu4kOuuC6LEua92qttfi3SXnn+Y4EjFysVe9sju+zquni7Pf0c138Hf0a5nFNeStJSu0001KL2Xk7rPxQKvAGloXEurh6VSW+VOLfjbM3SnEAAAAAAAAAAAAAAAAAAAAAAAARV2mK6c6jW7pJK/bmWiVBpeopVZqD2oqcrPtvJu5lXhgi7mvJ3Nirl1Vv4v9jBYxaxPZ9hNnDyqWznPL8Mcl6uRKTn6vUdjC0Y/3UXzktp/M6BTlfXF1t0b0+HdlecOvHvt70ea9UisN2T3cH+xdJUumcH0NepSfCXV74POL8mjKvFc2TaZ5bTa9TJOPB7u3sMFWLXf3mLWhqVpFVcOqe6VJKLXbH4Zfty7yQlS6qaSqUMRCUmthtQln8Mna/LJ8i2jY5anVAAakAAAAAAAAAAAAAAAAAAAAAeK7tGTf3X8iooxUbz72o+PFloaeqqOHqXdrx2f1ZfK5VWJqbTssksku76mV0wxd5mwNDpKkILfKaj5ux4qR2UlxfyOxqVh9vFw7I7U/JWXq0YqrOjFJJLclZeCPoBTiEN9oOjNpQxEd66kvB5xfndfmRMjBjcNGrTlTlulFp93Y13p58g2XqqeUnul5/U+ONjbxmGlTnKEl1otxa8Ow1rdhLswVHYuTRmKVWjTqr44RlzazXncp6puLC9nmL28M6b305v8ATLNeu0IjfiUgApzAAAAAAAAAAAAAAAAAAAAAEd15rbOHUVvlUVvBJ3/bzIHRpKK2pciW687U6lOCyUYOTfi7f0kOxVXadluWSJrrnxhrSu7ky9nOFzq1XwUYLn1pfKJC5rgWbqXhtjCRfGcpTfnZekUIa8d0AFOQAAIVr3o7ZlHERXvdSX4kuq+aTX5UQ6RZWulO+DqNfC4y8pK/o2VxKWRNdc34wVCVezWrarVh201L9Mrf1EWZ3NQ6uzjEvvQlH02v6RC+LNABTkAAAAAAAAAAAAAAAAAAAAfJySTbdkldvsS3sCCa9V2q9uHRxt5yIrR7Ta01j54yvKpbq7orsgt3PjzNWs0o7Eeb7yXaePFKLlKKWbby5vJFx4Oh0dOFNfDCMfJWKv1Xw/SYukuCmpcodb9i1jYjYADUAAA19IYfpaVSn9+nKPNppFPUXbJ8C6SqtYMGqWJqx3Lbcl+GXWXztyMq8ObKKNvVuts4yi+2pFfqtH9zTmzxRq7NSEl8Mk14p3MWusHxSTzW55rwZ9KcQAAAAAAAAAAAAAAAAAADm6xVlDDVG+Mdn9Ts/Rs6RFNfsXaEKS+JuT/Lkl6vyMrczuoXiaj92NkjVlFrej3sts8z7DHZKvZxh9qrVqP4IqK8Zv6R9SfEc1Dwmxhdt76k3Lkuqvk3zJGbHLV+gANSAAAQP2hYe1WFThKGzzi/pJE8I1r9htrC7f3Jp8n1X6teRlVm/Vbya4Ix3zR6hM81GY6ri0BV2sLQl20YX8VFJ/I3zial1NrBUu7aj5Tl+x2ynG+gADAAAAAAAAAAAeak1FOUnZJNt9iWbZw4a34R/HJLt2JW9MzuyimmmrpqzT4p8GVhrTqZVw7dbBp1KW901nOHgt8o+q9Q1Y2E0jRqq9OpCfg1fy3nI0xrlhMPPonKVSonZwpx2rP+aTtGPfd5FSLSTjnFtPv7UfIaSbUtrfN3k0ld8zRZFbXrpJwpYam1OTSfSWezferRfBXzvw3HSxdNVc6lpeKKw0BpmjhpSnKlKUpOykmnaOWVvHfyO7X16ivdpuXjkjjyTVvx6eG4zO7frr6Q0FCSvT6j7t3kc/B6tValTo9uEXsuSbvna10lv4nKq63VquUbU+zZtfm5X+RoaD0nVjpDD1JTc300Y5tvqzey14WkM41PazfJiz5F2YLDqlThTW6EFHyVrmYA6vMAAAAABpaZ6LoKka81ThKLi5SaVr7mr73x5Ea101xng6kaVKFOblG7k53cXd3UqcbOOVs287kAxena2M+0rzUnd7MEtmMI3y2Y37OO/dmwOvHV6cutTlGUHnGWeceDt4G9R1dglepNy7krep61YxEaOE+0mlHak43drRb7++/maWlNbIRT6NOfZwXm9/I89ureo9smJJam+qmJhGHQXUWm3CN82uNu22/mSA/Pi05X6aNdTtKElKKWUU1wt2Pcy+9H4pVqVOrHJVKcZpdilFO3qdsyyfXl3ZddxsAApAAAAAAAAAAAAAAjusWrFDE3k6C2/vwlsS55WfNEEx+odeL+yhOS73D5lugN7Uk9R8b/AAX+pGKepWOX/Zk/BxfzaLyAO1Ff8oY7/wAep+lfU7eqGp+JWLpVK9GUKcJbbb2VnHOKte/vJcC2gDsAAYAACIa4a3zwlToaVNOWwpOU81Z3tsxVr7t9+RDcXrrjKicXNpfyJR9Y5loaZ0LSxUUqqeW5q3Hukmn5Efn7OcI/iqrwlBfKAaqvFzdTfF777s/M15yksr2tlyLb/s4wv8Sv+tf+p7h7OcEt/Sy8Zr6DsU/Urylbak5WVldt2S4LsEm8k8uxOyfJPeXjhdTcDT3YeMvxty9G7HVw+j6NPKFKnBfywivkjDuKAoaOqTtsU5zvwhCcn6IvbVvDSpYShTmmpRowTT3pqKumdJIGloAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==',
    subtitle: 'Pants'
  },
]

export default class Catalogue extends React.Component{

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => {
      return(
        <ListItem
        title={item.name}
        subtitle={item.subtitle}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        leftElement={
          <Image style={{
            width:120,
            height:120
          }} source={{uri:item.avatar_url}} />
        }
        bottomDivider
        onPress={()=>{
          this.props.navigation.navigate('ShirtCatalogue')
        }}
      />
  )}

    keyExtractor1 = (item, index) => index.toString()

    renderItem1 = ({ item }) => {
      return(
        <ListItem
        title={item.name}
        subtitle={item.subtitle}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        leftElement={
          <Image style={{
            width:120,
            height:120,
            backgroundColor:'#F8BE85',
          }} source={{uri:item.avatar_url}} />
        }
        bottomDivider
        onPress={()=>{
          this.props.navigation.navigate('PantCatalogue')
        }}
      />
  )}

    render(){
        return(
            <View style={styles.container}>
              <View style={{marginTop:80,width:500}}>
              <MyHeader title="Catalogue" />
              </View>
              <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
                renderItem={this.renderItem}
                style={{backgroundColor:'#F8BE85',marginTop:50}}
              />
              <FlatList
                keyExtractor={this.keyExtractor1}
                data={list1}
                renderItem={this.renderItem1}
                style={{backgroundColor:'#F8BE85',marginBottom:100}}
              />
              </View>
            </View>
        )
    }
}