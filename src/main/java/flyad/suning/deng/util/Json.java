package flyad.suning.deng.util;

import com.google.gson.Gson;

public class Json {

	private static Gson gson;
	
	static{
		gson = new Gson();
	}
	
	public static <T> T fromJson(String jsonStr, Class<T> classOfT){
		return gson.fromJson(jsonStr, classOfT);
	}
	
	public static String toJson(Object object){
		return gson.toJson(object);
	}
}
