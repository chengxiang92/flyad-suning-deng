package flyad.suning.deng.vo;

/**
 * Created by asus on 2017/1/9.
 */
public class ResultVo {

    private String code;

    private String msg;

    private Object data;

    public ResultVo(String code, String msg){
        this.code = code;
        this.msg = msg;
    }

    public ResultVo(String code, String msg, Object data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
