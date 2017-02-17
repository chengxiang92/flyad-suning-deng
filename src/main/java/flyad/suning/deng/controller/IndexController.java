package flyad.suning.deng.controller;

import flyad.suning.deng.entity.Config;
import flyad.suning.deng.service.IndexServce;
import flyad.suning.deng.util.Json;
import flyad.suning.deng.vo.ResultVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;


/**
 * Created by asus on 2017/1/9.
 */
@Controller
@RequestMapping
public class IndexController {

    @Resource
    private IndexServce indexServce;

    @RequestMapping(value = "config", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String config(){
        Config config = indexServce.getConfig();
        return Json.toJson(new ResultVo("1","操作成功", config));
    }

}
