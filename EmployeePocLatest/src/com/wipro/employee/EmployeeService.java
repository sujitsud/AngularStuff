package com.wipro.employee;



import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public Employee getEmployeeRecordById(int id){
		String sql = "SELECT * FROM EMPLOYEETEST WHERE ID=?";
		return jdbcTemplate.queryForObject(sql, new Object[]{id}, new EmployeeMapper() );
	}
	private static final class EmployeeMapper implements RowMapper<Employee>{

		@Override
		public Employee mapRow(ResultSet resultSet, int rownum) throws SQLException {
			// TODO Auto-generated method stub
			Employee employee = new Employee();
			employee.setId(resultSet.getInt("ID"));
			employee.setName(resultSet.getString("NAME"));
			employee.setAge(resultSet.getInt("AGE"));
			employee.setExperience(resultSet.getInt("YRS_OF_EXP"));
			return employee;
		}
		
	}
	public List getAllEmployees(){
		String sql = "SELECT * FROM EMPLOYEETEST";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List getApplicationTrendChart(String applicationName){
		String sql="select count(incident_number) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-6), 'MONTH') as month from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-6) and last_day(add_months(trunc(sysdate,'mm'),-6))"
				+ "union all select count(incident_number) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-5), 'MONTH') as month from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-5) and last_day(add_months(trunc(sysdate,'mm'),-5))"
				+"union all select count(incident_number) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-4), 'MONTH') as month from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-4) and last_day(add_months(trunc(sysdate,'mm'),-4))"
				+"union all select count(*) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-3), 'MONTH') as month from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-3) and last_day(add_months(trunc(sysdate,'mm'),-3))"
				+" union all select count(*) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-2), 'MONTH') as month from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-2) and last_day(add_months(trunc(sysdate,'mm'),-2))"
				+"union all select count(*) as INCIDENT_COUNT,to_char(add_months(trunc(sysdate,'mm'),-1), 'MONTH') as MONTH from casedatadump where incident_assignment_group like '%"+applicationName+"%' and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1) and last_day(add_months(trunc(sysdate,'mm'),-1))";
	return jdbcTemplate.queryForList(sql);
	}
	
	public List getoverallApplicationTrendChart(){
		String sql= "select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-6), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-6) and last_day(add_months(trunc(sysdate,'mm'),-6))"
				+"union all select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-5), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-5) and last_day(add_months(trunc(sysdate,'mm'),-5))"
				+"union all select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-4), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-4) and last_day(add_months(trunc(sysdate,'mm'),-4))"
				+"union all select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-3), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-3) and last_day(add_months(trunc(sysdate,'mm'),-3))"
				+"union all select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-2), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-2) and last_day(add_months(trunc(sysdate,'mm'),-2))"
				+"union all select count(incident_number),to_char(add_months(trunc(sysdate,'mm'),-1), 'MONTH') as month from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1) and last_day(add_months(trunc(sysdate,'mm'),-1))";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List getApplicationDoughnutChart(){
		String sql = "select distinct count(incident_number) count, case "
                                              +"when INCIDENT_IMPACTED_SRVOFFERING like '%IRT%' then 'IRT' "
                                             +" when INCIDENT_IMPACTED_SRVOFFERING like '%TIMS%' then 'TIMS'"
                                              +"when INCIDENT_IMPACTED_SRVOFFERING like '%PRRQ%' then 'PRRQ'"
                                             +" when INCIDENT_IMPACTED_SRVOFFERING like '%CQI%' then 'CQI'"
                                              +"when INCIDENT_IMPACTED_SRVOFFERING like '%CFN%' then 'CFN'"
                                             +" when INCIDENT_IMPACTED_SRVOFFERING like '%Collaborator%' then 'CC' "
                                              +"when INCIDENT_IMPACTED_SRVOFFERING like '%BPR%' then 'BPR'"
                                             +" when INCIDENT_IMPACTED_SRVOFFERING like '%QIS%' then 'QIS'"
                                             +" else 'QDDTS' "
                                              +"end as Application_Name from casedatadump where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1)" 
                                              +"and last_day(add_months(trunc(sysdate,'mm'),-1)) group by INCIDENT_IMPACTED_SRVOFFERING";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List getOverallApplicationBarChart(){
		
		String sql="select to_char(add_months(trunc(sysdate,'mm'),-4), 'MONTH') as Month,"
            +"sum(case when incident_resolution_sla in ('Met','Missed') then 1 else 0 end) Total,"
            +"sum(case when incident_resolution_sla = 'Met' then 1 else 0 end) Met_SLA,"
            +"sum(case when incident_resolution_sla = 'Missed' then 1 else 0 end) Missed_SLA from casedatadump"
       +" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-4) and last_day(add_months(trunc(sysdate,'mm'),-4))"
+" union all select to_char(add_months(trunc(sysdate,'mm'),-3), 'MONTH') as Month,"
            +" sum(case when incident_resolution_sla in ('Met','Missed') then 1 else 0 end) Total,"
            +" sum(case when incident_resolution_sla = 'Met' then 1 else 0 end) Met_SLA ,"
            +" sum(case when incident_resolution_sla = 'Missed' then 1 else 0 end) Missed_SLA"
      +" from casedatadump"
       +" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-3)"
+" and last_day(add_months(trunc(sysdate,'mm'),-3))"
+" union all"
+" select to_char(add_months(trunc(sysdate,'mm'),-2), 'MONTH') as Month,"
            +" sum(case when incident_resolution_sla in ('Met','Missed') then 1 else 0 end) Total,"
            +" sum(case when incident_resolution_sla = 'Met' then 1 else 0 end) Met_SLA ,"
            +" sum(case when incident_resolution_sla = 'Missed' then 1 else 0 end) Missed_SLA"
       +" from casedatadump"
       +" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-2)"
+" and last_day(add_months(trunc(sysdate,'mm'),-2))"
+" union all"
+" select to_char(add_months(trunc(sysdate,'mm'),-1), 'MONTH') as Month,"
            +" sum(case when incident_resolution_sla in ('Met','Missed') then 1 else 0 end) Total,"
            +" sum(case when incident_resolution_sla = 'Met' then 1 else 0 end) Met_SLA,"
            +" sum(case when incident_resolution_sla = 'Missed' then 1 else 0 end) Missed_SLA"
       +" from casedatadump"
       +" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1)"
+" and last_day(add_months(trunc(sysdate,'mm'),-1))";
		
		return jdbcTemplate.queryForList(sql);
	}
	
	public List getPercentageIncrement(){
		String sql=" select"
				+" ((("
+" select distinct count(incident_number) case_count"
+" from casedatadump"
+" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1)" 
+" and last_day(add_months(trunc(sysdate,'mm'),-1)))"
+" -"
+" (select distinct count(incident_number) case_count"
+" from casedatadump"
+" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-2)"
+" and last_day(add_months(trunc(sysdate,'mm'),-2))"
+" ))"
+" /"
+" (select distinct count(incident_number) case_count from casedatadump"
+" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-2)" 
+" and last_day(add_months(trunc(sysdate,'mm'),-2)))) * 100 as percentage from dual";
		return jdbcTemplate.queryForList(sql);
	}
	public List getApplicationBarChart(String applicationName){
		String sql="select distinct case_categorization, count(case_categorization)  as count from casedatadump where incident_assignment_group like '%"+applicationName+"%' and case_categorization is not null and incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1) and last_day(add_months(trunc(sysdate,'mm'),-1))"
					+"group by case_categorization order by count(case_categorization) desc";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List totalCaseCountAndMonth(){
		String sql="select distinct count(incident_number) case_count, to_char(add_months(trunc(sysdate,'mm'),-1),'MONTH') as month"
				+" from casedatadump"
					+" where incident_opened_at_date between add_months(trunc(sysdate,'mm'),-1)"
					+" and last_day(add_months(trunc(sysdate,'mm'),-1))";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List getApplicationMonthPieChart(String application, String month){
		String sql="select distinct case_categorization, count(case_categorization)  as count from casedatadump where incident_assignment_group like '%"+application+"%' and case_categorization is not null"
				+ " and upper(to_char(incident_opened_at_date, 'month')) like '%"+month+"%' group by case_categorization"
				+ " order by count(case_categorization) desc";
		return jdbcTemplate.queryForList(sql);
	}
	public int getCount(String firstDate, String secondDate, String application){
		//String sql="SELECT COUNT(*) FROM EMPLOYEETEST";
		String sql="select count(*) from casedatadump where incident_assignment_group like ? and incident_opened_at_date between to_date(?,'mm/dd/yyyy') and to_date(?,'mm/dd/yyyy')";

		return jdbcTemplate.queryForObject(sql, new String[]{"%"+application+"%",firstDate,secondDate},Integer.class);
	}
	
	public List getHorizontalBarChart(){
		String sql ="select * from eng_it_resources";
		return jdbcTemplate.queryForList(sql);
	}
	
	public int insertDataTable(String editField, String selectedEorV, String selectedStatus, String selectedResource){
		String sql = "INSERT INTO DATATABLE " +
				"(ID, SUMMARY, EORV,STATUS,RESOURCENAME) VALUES (datatable_sequence.NEXTVAL, ?,?,?,?)";
		//return jdbcTemplate.update(sql, new String[]{editField,selectedEorV,selectedStatus,selectedResource},String.class);
		return jdbcTemplate.update(sql, new String[]{editField,selectedEorV,selectedStatus,selectedResource});
	}
	public int updateMiscellaneous(String month, String text){
		String sql = "UPDATE ENGIT_ENTER_MISC SET TEXT=UTL_RAW.CAST_TO_RAW(?) WHERE MONTH =?"; 
		
		return jdbcTemplate.update(sql, new String[]{text, month});
	}
	
	public int insertMiscellaneous(String month, String text){
		String sql ="INSERT INTO ENGIT_ENTER_MISC VALUES(?,UTL_RAW.CAST_TO_RAW(?))";
		return jdbcTemplate.update(sql, new String[]{month,text});
	}
	public Object getMiscellaneous( String month){
		Object obj= null;
		try{
		String sql ="select * from engit_enter_misc where month=?";
		 obj=jdbcTemplate.queryForObject(sql, new Object[]{month}, new RowMapper<Object>(){
			 public Object mapRow(ResultSet rs, int i) throws SQLException {
			        Map<String, String> results = new HashMap<String, String>();
			       // Blob blob=rs.getBlob("TEXT");
			       //  byte[] bytes = blob.getBytes(1, (int) blob.length());
			        
			      byte[] bytes=rs.getBytes("TEXT");
			      	results.put("MONTH", rs.getString("MONTH"));
			        results.put("TEXT", new String(bytes));
			        System.out.println(results);
			       
			        return results;
			        
			      }
				});
		}catch(EmptyResultDataAccessException e){
			throw new RecordNotFoundException("Data not found");
		}
		
		
		return obj;
	
}
}
