package com.wipro.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmployeeController {

	@Autowired
	public EmployeeService empservice;

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/employees/{id}")
	public @ResponseBody Employee getEmployeesById(@PathVariable int id) {
		return empservice.getEmployeeRecordById(id);

	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/employees")
	public @ResponseBody List<?> getAllEmployees() {
		return empservice.getAllEmployees();

	}

	@CrossOrigin(origins = "http://localhost:4200")
	// @RequestMapping("/count/{firstDate}/{secondDate}/{application}")
	@GetMapping("/count")
	public @ResponseBody int getCount(@RequestParam String firstDate, @RequestParam String secondDate,
			@RequestParam String application) {
		System.out.println(firstDate + " " + secondDate + " " + application);
		return empservice.getCount(firstDate, secondDate, application);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/applicationTrendChart")
	public @ResponseBody List<?> getApplicationTrendChart(@RequestParam String application) {
			System.out.println("Application Name:::"+application);
			return empservice.getApplicationTrendChart(application);
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/overallApplicationTrendChart")
	public @ResponseBody List<?> getoverallApplicationTrendChart() {
		
		return empservice.getoverallApplicationTrendChart();
}
	
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/applicationBarChart")
	public @ResponseBody List<?> getApplicationBarChart(@RequestParam String application) {
			System.out.println("Application Name:::"+application);
			return empservice.getApplicationBarChart(application);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/insert")
	public @ResponseBody int insertDataTable(@RequestParam String editField, @RequestParam String selectedEorV,
			@RequestParam String selectedStatus,@RequestParam String selectedResource) {
			System.out.println("Insert data:::");
			return empservice.insertDataTable(editField,selectedEorV,selectedStatus,selectedResource);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/updateMiscellaneous")
	public @ResponseBody int updateMiscellaneous(@RequestParam String month, @RequestParam String text) {
			System.out.println("Update Misc:::");
			return empservice.updateMiscellaneous(month, text);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/insertMiscellaneous")
	public @ResponseBody int insertMiscellaneous(@RequestParam String month, @RequestParam String text){
		System.out.println("Insert Misc:::");
		return empservice.insertMiscellaneous(month, text);
	}
	
	@CrossOrigin(origins="http://localhost:4200")	
	@GetMapping("/applicationMonthPieChart")
	public @ResponseBody List<?> getApplicationMonthPieChart(@RequestParam String application, @RequestParam String month ) {
		return empservice.getApplicationMonthPieChart(application,month);
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/percentageIncrement")
	public @ResponseBody List<?> getPercentageIncrement(){
		return empservice.getPercentageIncrement();
		
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/applicationDoughnutChart")
	public @ResponseBody List<?> getApplicationDoughnutChart(){
		return empservice.getApplicationDoughnutChart();
	}
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/overallApplicationBarChart")
	public @ResponseBody List<?> getOverallApplicationBarChart(){
		
		return empservice.getOverallApplicationBarChart();
		
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("totalCaseCountAndMonth")
	public @ResponseBody List<?> totalCaseCountAndMonth(){
		return empservice.totalCaseCountAndMonth();
	}
	
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/horizontalBarChart")
	public @ResponseBody List<?> getHorizontalBarChart(){
		return empservice.getHorizontalBarChart();
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/miscellaneous")
	public @ResponseBody Object getMiscellaneous(@RequestParam String month) {
		System.out.println(empservice.getMiscellaneous(month));
		return  empservice.getMiscellaneous(month);
			
	}
	
	
}
