package flyad.suning.deng.dao;

import flyad.suning.deng.entity.Config;

/**
 * Created by asus on 2017/1/9.
 */
public interface ConfigDao {

    public Config get();

    public int update(Config config);

}
