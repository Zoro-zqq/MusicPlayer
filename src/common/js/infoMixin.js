import Top from "../../components/common/Top";
import songList from "../../components/common/songList";
import scroll from "../../components/common/scroll";
import {mapState} from "vuex";

export default {
  data() {
    return {
      formatData: []
    }
  },
  components: {
    Top,
    songList,
    scroll
  },
  computed: {
    title(){
      return this.formatData.length>0?this.formatData[0].name:'暂无数据'
    },
    img(){
      return this.formatData.length>0?this.formatData[0].al.picUrl:''
    }
  },
}
