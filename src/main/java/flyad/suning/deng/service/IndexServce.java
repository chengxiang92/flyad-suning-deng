package flyad.suning.deng.service;

import flyad.suning.deng.dao.ConfigDao;
import flyad.suning.deng.entity.Config;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by asus on 2017/1/9.
 */
@Service
public class IndexServce {

    private static String mKy = "SUNING-YUANXIAO";

    @Resource
    private ConfigDao configDao;

    public Config getConfig(){
        Config config = (Config)CacheManager.getInstance().get(mKy+"-CONFIG");
        if(null == config){
            config= configDao.get();
            if(null != config){
                CacheManager.getInstance().set(mKy+"-CONFIG", config, 600);
            }
        }
        return config;
    }

    public boolean update(String title, String desc, String img, String rule){
        Config config = new Config();
        config.setTitle(title);
        config.setDesc(desc);
        config.setImg(img);
        config.setRule(rule);
        configDao.update(config);
        CacheManager.getInstance().delete(mKy+"-CONFIG");
        return true;
    }

}
