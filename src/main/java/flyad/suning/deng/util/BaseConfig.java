package flyad.suning.deng.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 配置
 * @author chengxiang
 *
 */
public class BaseConfig {

	private String authUrl;

	private String adminVerify;

	private String site;

	private String shareImgPath;

	private int authCacheTms;

	private int ticketCacheTms;

	private static String configPath = "config/config.properties";

	private static BaseConfig baseConfig;

	public BaseConfig(){
		reload();
	}

	public synchronized void reload() {

		InputStream inputStream = BaseConfig.class.getClassLoader().getResourceAsStream(configPath);
		Properties properties = new Properties();
		try{
			properties.load(inputStream);
		} catch (IOException e1){
			e1.printStackTrace();
		}

		this.adminVerify = properties.getProperty("adminVerify");
		this.authUrl = properties.getProperty("authUrl");
		this.site = properties.getProperty("site");
		this.authCacheTms = Integer.parseInt(properties.getProperty("authCacheTms"));
		this.ticketCacheTms = Integer.parseInt(properties.getProperty("ticketCacheTms"));
		this.shareImgPath = properties.getProperty("shareImgPath");

		try {
			inputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static BaseConfig getInstance(){
		if(baseConfig == null){
			return new BaseConfig();
		}
		return baseConfig;
	}

	public String getAuthUrl() {
		return authUrl;
	}

	public void setAuthUrl(String authUrl) {
		this.authUrl = authUrl;
	}

	public String getAdminVerify() {
		return adminVerify;
	}

	public void setAdminVerify(String adminVerify) {
		this.adminVerify = adminVerify;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public int getAuthCacheTms() {
		return authCacheTms;
	}

	public void setAuthCacheTms(int authCacheTms) {
		this.authCacheTms = authCacheTms;
	}

	public int getTicketCacheTms() {
		return ticketCacheTms;
	}

	public void setTicketCacheTms(int ticketCacheTms) {
		this.ticketCacheTms = ticketCacheTms;
	}

	public String getShareImgPath() {
		return shareImgPath;
	}

	public void setShareImgPath(String shareImgPath) {
		this.shareImgPath = shareImgPath;
	}
}
