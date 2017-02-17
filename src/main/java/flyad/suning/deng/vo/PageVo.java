package flyad.suning.deng.vo;

import java.util.List;

public class PageVo<T> {

	public List<T> dataList;

	public Integer count;

	public Integer pageNo;

	public Integer pageSize;

	public Integer pageNum;

	public PageVo() { }

	public PageVo(int pageNo, int pageSize, Integer count) {
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.count = count;
		this.pageNum = (count/pageSize)+((count % pageSize) > 0 ? 1:0) ;
	}
	
	public List<T> getDataList() {
		return dataList;
	}

	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

}
