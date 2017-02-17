package flyad.suning.deng.controller;

import flyad.suning.deng.entity.Config;
import flyad.suning.deng.service.IndexServce;
import flyad.suning.deng.util.BaseConfig;
import flyad.suning.deng.util.BaseToImg;
import flyad.suning.deng.util.Json;
import flyad.suning.deng.vo.ResultVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * Created by asus on 2017/1/9.
 */
@Controller
@RequestMapping("admin")
public class AdminController {

    @Resource
    private IndexServce indexServce;

    @RequestMapping("index")
    public String index(){
        return "admin/login";
    }

    @RequestMapping("login")
    public String login(
            String password,
            HttpServletRequest request
    ){
        if(BaseConfig.getInstance().getAdminVerify().equals(password)){
            request.getSession().setAttribute("adminVerify",password);
            return "redirect:config.do";
        }else{
            return "admin/login";
        }
    }

    @RequestMapping(value = "config", produces = {"application/json;charset=UTF-8"})
    public String config(Model model,HttpServletRequest request){
        if(null == request.getSession().getAttribute("adminVerify") || !BaseConfig.getInstance().getAdminVerify().equals(request.getSession().getAttribute("adminVerify"))){
            return "admin/login";
        }
        Config config = indexServce.getConfig();
        model.addAttribute("config", config);
        return "admin/config";
    }

    @RequestMapping(value = "update", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String config(
            String title,
            String desc,
            String img,
            String rule
    ){
        indexServce.update(title, desc, img, rule);
        return "1";
    }

    @RequestMapping(value = "upload", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String upload(
            HttpServletRequest request,
            String imgBase64
    ){
        String name = UUID.randomUUID().toString().replaceAll("-","");
        String path = BaseConfig.getInstance().getShareImgPath();
        String imgFilePath = path+"\\"+name+".jpg";
        if(BaseToImg.GenerateImage(imgFilePath, imgBase64.split(",")[1])){
            return Json.toJson(new ResultVo("1","操作成功", name));
        }else{
            return Json.toJson(new ResultVo("0","操作失败", ""));
        }
    }

}
