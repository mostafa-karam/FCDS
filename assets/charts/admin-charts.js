// @component - Administrative Charts
// This file contains the chart configurations for administrative dashboards

// Function to initialize user activity chart (mixed chart - line and bar)
function initUserActivityChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: 'Login Count',
                type: 'column',
                data: data.loginCounts
            },
            {
                name: 'Active Time (hours)',
                type: 'line',
                data: data.activeHours
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: [0, 4]
        },
        title: {
            text: 'User Activity',
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 600
            }
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: data.dates,
        xaxis: {
            type: 'category'
        },
        yaxis: [
            {
                title: {
                    text: 'Login Count',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Active Hours'
                }
            }
        ],
        colors: ['#6D28D9', '#0EA5E9']
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize role distribution chart (donut chart)
function initRoleDistributionChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: data.counts,
        chart: {
            type: 'donut',
            height: 350,
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        labels: data.roles,
        colors: ['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B'],
        plotOptions: {
            pie: {
                donut: {
                    size: '55%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Users',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0);
                            }
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 280
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        legend: {
            position: 'bottom'
        }
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize certificate requests chart (stacked bar chart)
function initCertificateRequestsChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [
            {
                name: 'Pending',
                data: data.pending
            },
            {
                name: 'Approved',
                data: data.approved
            },
            {
                name: 'Rejected',
                data: data.rejected
            }
        ],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 2
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: data.certificateTypes
        },
        yaxis: {
            title: {
                text: 'Number of Requests'
            },
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'left',
            offsetX: 40
        },
        colors: ['#F59E0B', '#10B981', '#EF4444']
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize course enrollment chart (column chart)
function initCourseEnrollmentChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: [{
            name: 'Enrolled Students',
            data: data.counts
        }],
        chart: {
            height: 350,
            type: 'bar',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: data.courses,
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val;
                }
            }
        },
        colors: ['#0EA5E9']
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();

    return chart;
}

// Function to initialize system activity chart (timeline chart)
function initSystemActivityChart(elementId, data) {
    if (!document.getElementById(elementId)) return;

    const options = {
        series: data.series,
        chart: {
            height: 350,
            type: 'rangeBar',
            fontFamily: 'Inter, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%',
                rangeBarGroupRows: true
            }
        },
        colors: [
            "#0EA5E9", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"
        ],
        fill: {
            type: 'solid'
        },
        xaxis: {
            type: 'datetime'
        },
        legend: {
            position: 'bottom'
        },
        tooltip: {
            custom: function (opts) {
                const fromDate = new Date(opts.y1).toLocaleDateString();
                const toDate = new Date(opts.y2).toLocaleDateString();
                const values = opts.ctx.rangeBar.getTooltipValues(opts);

                return (
                    '<div class="arrow_box">' +
                    '<span>' + values.seriesName + '</span>' +
                    '<span>From: ' + fromDate + '</span>' +
                    '<span>To: ' + toDate + '</span>' +
                    '</div>'
                );
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
    admin: {
        initUserActivityChart,
        initRoleDistributionChart,
        initCertificateRequestsChart,
        initCourseEnrollmentChart,
        initSystemActivityChart
    }
}; 