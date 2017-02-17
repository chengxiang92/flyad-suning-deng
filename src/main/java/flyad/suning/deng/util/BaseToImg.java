package flyad.suning.deng.util;

import sun.misc.BASE64Decoder;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * Created by cheng on 2016/8/7.
 */
public class BaseToImg {

    // base64字符串转化成图片
    public static boolean GenerateImage(String imgFilePath,String imgBase64) { // 对字节数组字符串进行Base64解码并生成图片
        if (imgBase64 == null){
            return false;// 图像数据为空
        }

        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] b = decoder.decodeBuffer(imgBase64);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }

            // 生成jpeg图片
            ByteArrayInputStream bi = new ByteArrayInputStream(b);
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();
            System.out.print(imgFilePath);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
