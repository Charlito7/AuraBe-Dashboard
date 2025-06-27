<template>
  <div class="chart-container">
    <div class="period-selector">
      <select v-model="selectedPeriod" @change="handlePeriodChange">
        <option value="week">Les 7 derniers Jours</option>
        <option value="month">Les 30 derniers Jours</option>
        <option value="custom">Période personnalisée</option>
      </select>

      <div v-if="selectedPeriod === 'custom'" class="custom-period">
        <input type="date" v-model="startDate" />
        <span>à</span>
        <input type="date" v-model="endDate" />
        <button @click="fetchCustomData" class="submit-btn">Valider</button>
      </div>
    </div>

    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "@/services/api";
import { format, subDays} from "date-fns";

interface DateRange {
  startDate: string;
  endDate: string;
}
export default defineComponent({
  name: "SalesChart",
  data() {
    return {
      selectedPeriod: "week",
      startDate: "",
      endDate: "",
      series: [] as { name: string; data: number[] }[],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: false },
        },
        colors: ["#4F46E5"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            endingShape: "rounded",
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: number) {
            return  val.toFixed(2); 
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [] as string[],
        },
        yaxis: {
          title: { text: "Montant (HTG )" },
        },
        grid: {
          show: true,
          borderColor: "#EEF3FA",
          strokeDashArray: 0,
          position: "back",
        },
        fill: { opacity: 1 },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return "HTG " + val.toFixed(2);
            },
          },
        },
      },
    };
  },
  async created() {
    await this.initializeDates();
    await this.fetchSalesData();
  },
  methods: {
    async initializeDates() {
      const today = new Date();
      this.endDate = format(today, 'yyyy-MM-dd');
      
      if (this.selectedPeriod === 'week') {
        this.startDate = format(subDays(today, 7), 'yyyy-MM-dd');
      } else if (this.selectedPeriod === 'month') {
        this.startDate = format(subDays(today, 30), 'yyyy-MM-dd');
      } else {
        // Par défaut 7 jours pour la période personnalisée
        this.startDate = format(subDays(today, 7), 'yyyy-MM-dd');
      }
    },
    
    handlePeriodChange() {
      this.initializeDates().then(() => {
        this.fetchSalesData();
      });
    },
    

    async fetchSalesData() {
      try {
   
        let endpoint = process.env.VUE_APP_GET_WEEK_SALES_SUMMARY;    
        const salesData: DateRange = {
              startDate: this.startDate,
              endDate: this.endDate
        } 
        const response = await api.post(endpoint, salesData);
        this.processChartData(response.data.result);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        this.series = [{ name: "Ventes", data: [] }];
        this.chartOptions.xaxis.categories = [];
      }
    },
    
 async fetchCustomData() {
    if (!this.startDate || !this.endDate) {
      console.error("Les dates de début et de fin sont requises");
      return;
    }
    
    // Validation que la date de fin est après la date de début
    if (new Date(this.endDate) < new Date(this.startDate)) {
      console.error("La date de fin doit être après la date de début");
      return;
    }
    
    await this.fetchSalesData();
  },

    processChartData(apiData: Array<{salesDate: string, salesTotalAmount: number}>) {
      const sortedData = [...apiData].sort((a, b) => 
        new Date(a.salesDate).getTime() - new Date(b.salesDate).getTime()
      );

      const dates = sortedData.map(item => {
        const date = new Date(item.salesDate);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      });

      const amounts = sortedData.map(item => item.salesTotalAmount);

      this.series = [{
        name: "Ventes",
        data: amounts
      }];

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: dates
        }
      };
    }
  }
});
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}

.period-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.period-selector select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.custom-period {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-period input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4F46E5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #4338CA;
}
</style>