// @component - Attendance Charts
// This file contains the chart configurations for attendance-related visualizations

// Function to initialize student attendance percentage chart (doughnut chart)
function initStudentAttendanceChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [data.percentage],
        chart: {
            height: 250,
            type: 'radialBar',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: 'transparent',
                },
                track: {
                    background: '#e7e7e7',
                    strokeWidth: '67%',
                    margin: 0,
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#888',
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '36px',
                        fontWeight: 700,
                        color: undefined,
                        offsetY: 6,
                        formatter: function (val) {
                            return val + '%';
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Attendance'],
        colors: ['#20E647']
    };

    // Create chart based on attendance percentage
    if (data.percentage < 75) {
        options.colors = ['#F87171'];
        options.fill.gradient.gradientToColors = ['#FCA5A5'];
    } else if (data.percentage < 85) {
        options.colors = ['#FBBF24'];
        options.fill.gradient.gradientToColors = ['#FCD34D'];
    }

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize monthly attendance chart (line chart)
function initMonthlyAttendanceChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    // Process data
    const categories = data.map(item => item.date);
    const presentSeries = data.map(item => item.present);
    const absentSeries = data.map(item => item.absent);

    const options = {
        series: [
            {
                name: 'Present',
                data: presentSeries
            },
            {
                name: 'Absent',
                data: absentSeries
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: false
            },
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: true
            }
        },
        colors: ['#22C55E', '#EF4444'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        grid: {
            borderColor: '#e0e0e0',
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            }
        },
        markers: {
            size: 4
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Date'
            }
        },
        yaxis: {
            title: {
                text: 'Students'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + " students";
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize attendance by course chart (bar chart)
function initAttendanceByCourseChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [{
            name: 'Attendance %',
            data: data.map(item => item.percentage)
        }],
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 2
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['#0EA5E9'],
        xaxis: {
            categories: data.map(item => item.course),
        },
        yaxis: {
            title: {
                text: 'Attendance %'
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
                    return val + "%";
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize weekly attendance pattern chart (heatmap)
function initWeeklyAttendancePatternChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: data.series,
        chart: {
            height: 300,
            type: 'heatmap',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#0EA5E9"],
        title: {
            text: 'Weekly Attendance Pattern',
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 600
            }
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 60,
                            name: 'Low',
                            color: '#F87171'
                        },
                        {
                            from: 60.1,
                            to: 80,
                            name: 'Medium',
                            color: '#FBBF24'
                        },
                        {
                            from: 80.1,
                            to: 100,
                            name: 'High',
                            color: '#22C55E'
                        }
                    ]
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
    attendance: {
        initStudentAttendanceChart,
        initMonthlyAttendanceChart,
        initAttendanceByCourseChart,
        initWeeklyAttendancePatternChart
    }
}; 