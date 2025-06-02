// @component - Performance Charts
// This file contains the chart configurations for academic performance visualizations

// Function to initialize CGPA chart (line chart)
function initCGPAChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: "CGPA",
                data: data.values
            }
        ],
        chart: {
            height: 350,
            type: "line",
            fontFamily: 'Inter, sans-serif',
            dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ["#6D28D9"],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: "smooth",
            width: 3
        },
        grid: {
            row: {
                colors: ["transparent", "transparent"],
                opacity: 0.5
            }
        },
        markers: {
            size: 5
        },
        xaxis: {
            categories: data.semesters,
            title: {
                text: "Semester"
            }
        },
        yaxis: {
            title: {
                text: "CGPA"
            },
            min: 0,
            max: 10
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        tooltip: {
            theme: "dark"
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize subject-wise performance chart (radar chart)
function initSubjectPerformanceChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: "Marks",
                data: data.marks
            }
        ],
        chart: {
            height: 350,
            type: "radar",
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        colors: ["#8B5CF6"],
        xaxis: {
            categories: data.subjects
        },
        yaxis: {
            show: false
        },
        markers: {
            size: 5,
            hover: {
                size: 10
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        plotOptions: {
            radar: {
                size: 140,
                polygons: {
                    strokeColors: "#E2E8F0",
                    fill: {
                        colors: ["#F8FAFC", "#F1F5F9"]
                    }
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize grade distribution chart (pie chart)
function initGradeDistributionChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: data.counts,
        chart: {
            width: 380,
            type: "pie",
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        labels: data.grades,
        colors: ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 280
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ],
        legend: {
            position: "bottom"
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " subjects";
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize performance comparison chart (bar chart)
function initPerformanceComparisonChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: "Your Score",
                data: data.studentScores
            },
            {
                name: "Class Average",
                data: data.classAverage
            }
        ],
        chart: {
            type: "bar",
            height: 350,
            fontFamily: 'Inter, sans-serif',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 2,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        colors: ["#3B82F6", "#9CA3AF"],
        xaxis: {
            categories: data.subjects
        },
        yaxis: {
            title: {
                text: "Marks"
            },
            min: 0,
            max: 100
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " marks";
                }
            }
        },
        legend: {
            position: "top"
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize semester-wise performance trend chart (area chart)
function initSemesterPerformanceTrendChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: "Performance Score",
                data: data.scores
            }
        ],
        chart: {
            type: "area",
            height: 350,
            fontFamily: 'Inter, sans-serif',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        colors: ["#0EA5E9"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: data.semesters
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Export chart initialization functions
window.fcdsCharts = {
    ...(window.fcdsCharts || {}),
    performance: {
        initCGPAChart,
        initSubjectPerformanceChart,
        initGradeDistributionChart,
        initPerformanceComparisonChart,
        initSemesterPerformanceTrendChart
    }
}; 