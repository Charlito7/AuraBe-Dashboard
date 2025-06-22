<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "@/services/api";

export default defineComponent({
  name: "WeeklySalesChart",
  data() {
    return {
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
              position: "top", // Position des valeurs
            },
          },
        },
        dataLabels: {
          enabled: true, // Activer l'affichage des valeurs
          formatter: function(val: number) {
            return "HTG " + val.toFixed(2); // Formatage des valeurs
          },
          offsetY: -20, // Ajuster la position verticale
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
    await this.fetchSalesData();
  },
  methods: {
    async fetchSalesData() {
      try {
        const response = await api.post(`${process.env.VUE_APP_GET_WEEK_SALES_SUMMARY}`);
        this.processChartData(response.data.result);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        this.series = [{ name: "Sales", data: [] }];
        this.chartOptions.xaxis.categories = [];
      }
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