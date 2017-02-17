package flyad.suning.deng.service;

import net.spy.memcached.AddrUtil;
import net.spy.memcached.BinaryConnectionFactory;
import net.spy.memcached.MemcachedClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

/**
 * Created by 祥 on 2016/4/2.
 */
public class CacheManager {
    private static String host; //控制台上的“内网地址”
    private static String port; //默认端口 11211，不用改

    private static MemcachedClient mcc;

    private static CacheManager memCached;

    private static String configPath = "config/cache.properties";


    // 设置与缓存服务器的连接池
    public synchronized void reload() {

        InputStream inputStream = CacheManager.class.getClassLoader().getResourceAsStream(configPath);
        Properties properties = new Properties();
        try{
            properties.load(inputStream);
        } catch (IOException e1){
            e1.printStackTrace();
        }
        host = properties.getProperty("host");
        port = properties.getProperty("port");
        try {
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 保护型构造方法，不允许实例化！
     *
     */
    public CacheManager() {
        reload();
        try{
            this.mcc = new MemcachedClient(new BinaryConnectionFactory(), AddrUtil.getAddresses(host + ":" + port));
        }catch (IOException e){
            e.printStackTrace();
        }

    }

    /**
     * 获取唯一实例.
     *
     * @return
     */
    public static CacheManager getInstance() {
        if(null == memCached){
            memCached = new CacheManager();
        }
        return memCached;
    }

    public Object get(String key){
        return mcc.get(key);
    }

    public boolean add(String key, Object value, int expire) {
        Future<Boolean> f = mcc.set(key, expire, value);
        return getBooleanValue(f);
    }

    public boolean set(String key, Object value, int expire){
        Future<Boolean> f = mcc.set(key, expire, value);
        return  getBooleanValue(f);
    }

    public boolean replace(String key, Object value, int expire) {
        Future<Boolean> f = mcc.replace(key, expire, value);
        return getBooleanValue(f);
    }

    public Boolean delete(String key) {
        Future<Boolean> f = mcc.delete(key);
        return getBooleanValue(f);
    }

    private boolean getBooleanValue(Future<Boolean> f) {
        try {
            Boolean bool = f.get(5, TimeUnit.SECONDS);
            return bool.booleanValue();
        } catch (Exception e) {
            f.cancel(false);
            return false;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println(CacheManager.getInstance().add("a", "abcd",100));
        System.out.println(CacheManager.getInstance().get("a"));

    }
}
