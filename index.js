let timer = true

const testData = [
    { time: '2018-10-19', close: 54.62, ask: 54.62, high: 55.50, low: 54.52, bid: 54.90, open: 54.90 },
    { time: '2018-10-22', close: 55.08, ask: 55.08, high: 55.27, low: 54.61, bid: 54.98, open: 54.98 },
    { time: '2018-10-23', close: 56.09, ask: 56.09, high: 57.47, low: 56.09, bid: 57.21, open: 57.21 },
    { time: '2018-10-24', close: 57.00, ask: 57.00, high: 58.44, low: 56.41, bid: 57.42, open: 57.42 },
    { time: '2018-10-25', close: 57.46, ask: 57.46, high: 57.63, low: 56.17, bid: 56.43, open: 56.43 },
    { time: '2018-10-26', close: 56.26, ask: 56.26, high: 56.62, low: 55.19, bid: 55.51, open: 55.51 },
    { time: '2018-10-29', close: 55.81, ask: 55.81, high: 57.15, low: 55.72, bid: 56.48, open: 56.48 },
    { time: '2018-10-30', close: 56.92, ask: 56.92, high: 58.80, low: 56.92, bid: 58.18, open: 58.18 },
    { time: '2018-10-31', close: 58.32, ask: 58.32, high: 58.32, low: 56.76, bid: 57.09, open: 57.09 },
    { time: '2018-11-01', close: 56.98, ask: 56.98, high: 57.28, low: 55.55, bid: 56.05, open: 56.05 },
    { time: '2018-11-02', close: 56.34, ask: 56.34, high: 57.08, low: 55.92, bid: 56.63, open: 56.63 },
    { time: '2018-11-05', close: 56.51, ask: 56.51, high: 57.45, low: 56.51, bid: 57.21, open: 57.21 },
    { time: '2018-11-06', close: 57.02, ask: 57.02, high: 57.35, low: 56.65, bid: 57.21, open: 57.21 },
    { time: '2018-11-07', close: 57.55, ask: 57.55, high: 57.78, low: 57.03, bid: 57.65, open: 57.65 },
    { time: '2018-11-08', close: 57.70, ask: 57.70, high: 58.44, low: 57.66, bid: 58.27, open: 58.27 },
    { time: '2018-11-09', close: 58.32, ask: 58.32, high: 59.20, low: 57.94, bid: 58.46, open: 58.46 },
    { time: '2018-11-12', close: 58.84, ask: 58.84, high: 59.40, low: 58.54, bid: 58.72, open: 58.72 },
    { time: '2018-11-13', close: 59.09, ask: 59.09, high: 59.14, low: 58.32, bid: 58.66, open: 58.66 },
    { time: '2018-11-14', close: 59.13, ask: 59.13, high: 59.32, low: 58.41, bid: 58.94, open: 58.94 },
    { time: '2018-11-15', close: 58.85, ask: 58.85, high: 59.09, low: 58.45, bid: 59.08, open: 59.08 },
    { time: '2018-11-16', close: 59.06, ask: 59.06, high: 60.39, low: 58.91, bid: 60.21, open: 60.21 },
    { time: '2018-11-19', close: 60.25, ask: 60.25, high: 61.32, low: 60.18, bid: 60.62, open: 60.62 },
    { time: '2018-11-20', close: 61.03, ask: 61.03, high: 61.58, low: 59.17, bid: 59.46, open: 59.46 },
    { time: '2018-11-21', close: 59.26, ask: 59.26, high: 59.90, low: 58.88, bid: 59.16, open: 59.16 },
    { time: '2018-11-23', close: 58.86, ask: 58.86, high: 59.00, low: 58.29, bid: 58.64, open: 58.64 },
    { time: '2018-11-26', close: 58.64, ask: 58.64, high: 59.51, low: 58.31, bid: 59.17, open: 59.17 },
    { time: '2018-11-27', close: 59.21, ask: 59.21, high: 60.70, low: 59.18, bid: 60.65, open: 60.65 },
    { time: '2018-11-28', close: 60.70, ask: 60.70, high: 60.73, low: 59.64, bid: 60.06, open: 60.06 },
    { time: '2018-11-29', close: 59.42, ask: 59.42, high: 59.79, low: 59.26, bid: 59.45, open: 59.45 },
    { time: '2018-11-30', close: 59.57, ask: 59.57, high: 60.37, low: 59.48, bid: 60.30, open: 60.30 },
    { time: '2018-12-03', close: 59.50, ask: 59.50, high: 59.75, low: 57.69, bid: 58.16, open: 58.16 },
    { time: '2018-12-04', close: 58.10, ask: 58.10, high: 59.40, low: 57.96, bid: 58.09, open: 58.09 },
    { time: '2018-12-06', close: 58.18, ask: 58.18, high: 58.64, low: 57.16, bid: 58.08, open: 58.08 },
    { time: '2018-12-07', close: 57.91, ask: 57.91, high: 58.43, low: 57.34, bid: 57.68, open: 57.68 },
    { time: '2018-12-10', close: 57.80, ask: 57.80, high: 58.37, low: 56.87, bid: 58.27, open: 58.27 },
    { time: '2018-12-11', close: 58.77, ask: 58.77, high: 59.40, low: 58.63, bid: 58.85, open: 58.85 },
    { time: '2018-12-12', close: 57.79, ask: 57.79, high: 58.19, low: 57.23, bid: 57.25, open: 57.25 },
    { time: '2018-12-13', close: 57.00, ask: 57.00, high: 57.50, low: 56.81, bid: 57.09, open: 57.09 },
    { time: '2018-12-14', close: 56.95, ask: 56.95, high: 57.50, low: 56.75, bid: 57.08, open: 57.08 },
    { time: '2018-12-17', close: 57.06, ask: 57.06, high: 57.31, low: 55.53, bid: 55.95, open: 55.95 },
    { time: '2018-12-18', close: 55.94, ask: 55.94, high: 56.69, low: 55.31, bid: 55.65, open: 55.65 },
    { time: '2018-12-19', close: 55.72, ask: 55.72, high: 56.92, low: 55.50, bid: 55.86, open: 55.86 },
    { time: '2018-12-20', close: 55.92, ask: 55.92, high: 56.01, low: 54.26, bid: 55.07, open: 55.07 },
    { time: '2018-12-21', close: 54.84, ask: 54.84, high: 56.53, low: 54.24, bid: 54.92, open: 54.92 },
    { time: '2018-12-24', close: 54.68, ask: 54.68, high: 55.04, low: 52.94, bid: 53.05, open: 53.05 },
    { time: '2018-12-26', close: 53.23, ask: 53.23, high: 54.47, low: 52.40, bid: 54.44, open: 54.44 },
    { time: '2018-12-27', close: 54.31, ask: 54.31, high: 55.17, low: 53.35, bid: 55.15, open: 55.15 },
    { time: '2018-12-28', close: 55.37, ask: 55.37, high: 55.86, low: 54.90, bid: 55.27, open: 55.27 },
    { time: '2018-12-31', close: 55.53, ask: 55.53, high: 56.23, low: 55.07, bid: 56.22, open: 56.22 },
    { time: '2019-01-02', close: 56.16, ask: 56.16, high: 56.16, low: 55.28, bid: 56.02, open: 56.02 },
    { time: '2019-01-03', close: 56.30, ask: 56.30, high: 56.99, low: 56.06, bid: 56.22, open: 56.22 },
    { time: '2019-01-04', close: 56.49, ask: 56.49, high: 56.89, low: 55.95, bid: 56.36, open: 56.36 },
    { time: '2019-01-07', close: 56.76, ask: 56.76, high: 57.26, low: 56.55, bid: 56.72, open: 56.72 },
    { time: '2019-01-08', close: 57.27, ask: 57.27, high: 58.69, low: 57.05, bid: 58.38, open: 58.38 },
    { time: '2019-01-09', close: 57.68, ask: 57.68, high: 57.72, low: 56.85, bid: 57.05, open: 57.05 },
    { time: '2019-01-10', close: 57.29, ask: 57.29, high: 57.70, low: 56.87, bid: 57.60, open: 57.60 },
    { time: '2019-01-11', close: 57.84, ask: 57.84, high: 58.26, low: 57.42, bid: 58.02, open: 58.02 },
    { time: '2019-01-14', close: 57.83, ask: 57.83, high: 58.15, low: 57.67, bid: 58.03, open: 58.03 },
    { time: '2019-01-15', close: 57.74, ask: 57.74, high: 58.29, low: 57.58, bid: 58.10, open: 58.10 },
    { time: '2019-01-16', close: 57.93, ask: 57.93, high: 57.93, low: 57.00, bid: 57.08, open: 57.08 },
    { time: '2019-01-17', close: 57.16, ask: 57.16, high: 57.40, low: 56.21, bid: 56.83, open: 56.83 },
    { time: '2019-01-18', close: 56.92, ask: 56.92, high: 57.47, low: 56.84, bid: 57.09, open: 57.09 },
    { time: '2019-01-22', close: 57.23, ask: 57.23, high: 57.39, low: 56.40, bid: 56.99, open: 56.99 },
    { time: '2019-01-23', close: 56.98, ask: 56.98, high: 57.87, low: 56.93, bid: 57.76, open: 57.76 },
    { time: '2019-01-24', close: 57.61, ask: 57.61, high: 57.65, low: 56.50, bid: 57.07, open: 57.07 },
    { time: '2019-01-25', close: 57.18, ask: 57.18, high: 57.47, low: 56.23, bid: 56.40, open: 56.40 },
    { time: '2019-01-28', close: 56.12, ask: 56.12, high: 56.22, low: 54.80, bid: 55.07, open: 55.07 },
    { time: '2019-01-29', close: 53.62, ask: 53.62, high: 54.30, low: 52.97, bid: 53.28, open: 53.28 },
    { time: '2019-01-30', close: 53.10, ask: 53.10, high: 54.02, low: 52.28, bid: 54.00, open: 54.00 },
    { time: '2019-01-31', close: 54.05, ask: 54.05, high: 55.19, low: 53.53, bid: 55.06, open: 55.06 },
    { time: '2019-02-01', close: 55.21, ask: 55.21, high: 55.30, low: 54.47, bid: 54.55, open: 54.55 },
    { time: '2019-02-04', close: 54.60, ask: 54.60, high: 54.69, low: 53.67, bid: 54.04, open: 54.04 },
    { time: '2019-02-05', close: 54.10, ask: 54.10, high: 54.34, low: 53.61, bid: 54.14, open: 54.14 },
    { time: '2019-02-06', close: 54.11, ask: 54.11, high: 54.37, low: 53.68, bid: 53.79, open: 53.79 },
    { time: '2019-02-07', close: 53.61, ask: 53.61, high: 53.73, low: 53.02, bid: 53.57, open: 53.57 },
    { time: '2019-02-08', close: 53.36, ask: 53.36, high: 53.96, low: 53.30, bid: 53.95, open: 53.95 },
    { time: '2019-02-11', close: 54.13, ask: 54.13, high: 54.37, low: 53.86, bid: 54.05, open: 54.05 },
    { time: '2019-02-12', close: 54.45, ask: 54.45, high: 54.77, low: 54.19, bid: 54.42, open: 54.42 },
    { time: '2019-02-13', close: 54.35, ask: 54.35, high: 54.77, low: 54.28, bid: 54.48, open: 54.48 },
    { time: '2019-02-14', close: 54.38, ask: 54.38, high: 54.52, low: 53.95, bid: 54.03, open: 54.03 },
    { time: '2019-02-15', close: 54.48, ask: 54.48, high: 55.19, low: 54.32, bid: 55.16, open: 55.16 },
    { time: '2019-02-19', close: 55.06, ask: 55.06, high: 55.66, low: 54.82, bid: 55.44, open: 55.44 },
    { time: '2019-02-20', close: 55.37, ask: 55.37, high: 55.91, low: 55.24, bid: 55.76, open: 55.76 },
    { time: '2019-02-21', close: 55.55, ask: 55.55, high: 56.72, low: 55.46, bid: 56.15, open: 56.15 },
    { time: '2019-02-22', close: 56.43, ask: 56.43, high: 57.13, low: 56.40, bid: 56.92, open: 56.92 },
    { time: '2019-02-25', close: 57.00, ask: 57.00, high: 57.27, low: 56.55, bid: 56.78, open: 56.78 },
    { time: '2019-02-26', close: 56.82, ask: 56.82, high: 57.09, low: 56.46, bid: 56.64, open: 56.64 },
    { time: '2019-02-27', close: 56.55, ask: 56.55, high: 56.73, low: 56.35, bid: 56.72, open: 56.72 },
    { time: '2019-02-28', close: 56.74, ask: 56.74, high: 57.61, low: 56.72, bid: 56.92, open: 56.92 },
    { time: '2019-03-01', close: 57.02, ask: 57.02, high: 57.15, low: 56.35, bid: 56.96, open: 56.96 },
    { time: '2019-03-04', close: 57.15, ask: 57.15, high: 57.34, low: 55.66, bid: 56.24, open: 56.24 },
    { time: '2019-03-05', close: 56.09, ask: 56.09, high: 56.17, low: 55.51, bid: 56.08, open: 56.08 },
    { time: '2019-03-06', close: 56.19, ask: 56.19, high: 56.42, low: 55.45, bid: 55.68, open: 55.68 },
    { time: '2019-03-07', close: 55.76, ask: 55.76, high: 56.40, low: 55.72, bid: 56.30, open: 56.30 },
    { time: '2019-03-08', close: 56.36, ask: 56.36, high: 56.68, low: 56.00, bid: 56.53, open: 56.53 },
    { time: '2019-03-11', close: 56.76, ask: 56.76, high: 57.62, low: 56.75, bid: 57.58, open: 57.58 },
    { time: '2019-03-12', close: 57.63, ask: 57.63, high: 58.11, low: 57.36, bid: 57.43, open: 57.43 },
    { time: '2019-03-13', close: 57.37, ask: 57.37, high: 57.74, low: 57.34, bid: 57.66, open: 57.66 },
    { time: '2019-03-14', close: 57.71, ask: 57.71, high: 58.09, low: 57.51, bid: 57.95, open: 57.95 },
    { time: '2019-03-15', close: 58.04, ask: 58.04, high: 58.51, low: 57.93, bid: 58.39, open: 58.39 },
    { time: '2019-03-18', close: 58.27, ask: 58.27, high: 58.32, low: 57.56, bid: 58.07, open: 58.07 },
    { time: '2019-03-19', close: 58.10, ask: 58.10, high: 58.20, low: 57.31, bid: 57.50, open: 57.50 },
    { time: '2019-03-20', close: 57.51, ask: 57.51, high: 58.05, low: 57.11, bid: 57.67, open: 57.67 },
    { time: '2019-03-21', close: 57.58, ask: 57.58, high: 58.49, low: 57.57, bid: 58.29, open: 58.29 },
    { time: '2019-03-22', close: 58.16, ask: 58.16, high: 60.00, low: 58.13, bid: 59.76, open: 59.76 },
    { time: '2019-03-25', close: 59.63, ask: 59.63, high: 60.19, low: 59.53, bid: 60.08, open: 60.08 },
    { time: '2019-03-26', close: 60.30, ask: 60.30, high: 60.69, low: 60.17, bid: 60.63, open: 60.63 },
    { time: '2019-03-27', close: 60.56, ask: 60.56, high: 61.19, low: 60.48, bid: 60.88, open: 60.88 },
    { time: '2019-03-28', close: 60.88, ask: 60.88, high: 60.89, low: 58.44, bid: 59.08, open: 59.08 },
    { time: '2019-03-29', close: 59.20, ask: 59.20, high: 59.27, low: 58.32, bid: 59.13, open: 59.13 },
    { time: '2019-04-01', close: 59.39, ask: 59.39, high: 59.41, low: 58.79, bid: 59.09, open: 59.09 },
    { time: '2019-04-02', close: 59.22, ask: 59.22, high: 59.23, low: 58.34, bid: 58.53, open: 58.53 },
    { time: '2019-04-03', close: 58.78, ask: 58.78, high: 59.07, low: 58.41, bid: 58.87, open: 58.87 },
    { time: '2019-04-04', close: 58.84, ask: 58.84, high: 59.10, low: 58.77, bid: 58.99, open: 58.99 },
    { time: '2019-04-05', close: 59.02, ask: 59.02, high: 59.09, low: 58.82, bid: 59.09, open: 59.09 },
    { time: '2019-04-08', close: 59.02, ask: 59.02, high: 59.13, low: 58.72, bid: 59.13, open: 59.13 },
    { time: '2019-04-09', close: 58.37, ask: 58.37, high: 58.56, low: 58.04, bid: 58.40, open: 58.40 },
    { time: '2019-04-10', close: 58.40, ask: 58.40, high: 58.70, low: 58.36, bid: 58.61, open: 58.61 },
    { time: '2019-04-11', close: 58.65, ask: 58.65, high: 58.73, low: 58.20, bid: 58.56, open: 58.56 },
    { time: '2019-04-12', close: 58.75, ask: 58.75, high: 58.79, low: 58.52, bid: 58.74, open: 58.74 },
    { time: '2019-04-15', close: 58.91, ask: 58.91, high: 58.95, low: 58.59, bid: 58.71, open: 58.71 },
    { time: '2019-04-16', close: 58.79, ask: 58.79, high: 58.98, low: 58.66, bid: 58.79, open: 58.79 },
    { time: '2019-04-17', close: 58.40, ask: 58.40, high: 58.46, low: 57.64, bid: 57.78, open: 57.78 },
    { time: '2019-04-18', close: 57.51, ask: 57.51, high: 58.20, low: 57.28, bid: 58.04, open: 58.04 },
    { time: '2019-04-22', close: 58.14, ask: 58.14, high: 58.49, low: 57.89, bid: 58.37, open: 58.37 },
    { time: '2019-04-23', close: 57.62, ask: 57.62, high: 57.72, low: 56.30, bid: 57.15, open: 57.15 },
    { time: '2019-04-24', close: 57.34, ask: 57.34, high: 57.57, low: 56.73, bid: 57.08, open: 57.08 },
    { time: '2019-04-25', close: 56.82, ask: 56.82, high: 56.90, low: 55.75, bid: 55.85, open: 55.85 },
    { time: '2019-04-26', close: 56.06, ask: 56.06, high: 56.81, low: 55.83, bid: 56.58, open: 56.58 },
    { time: '2019-04-29', close: 56.75, ask: 56.75, high: 57.17, low: 56.71, bid: 56.84, open: 56.84 },
    { time: '2019-04-30', close: 56.99, ask: 56.99, high: 57.45, low: 56.76, bid: 57.19, open: 57.19 },
    { time: '2019-05-01', close: 57.23, ask: 57.23, high: 57.30, low: 56.52, bid: 56.52, open: 56.52 },
    { time: '2019-05-02', close: 56.81, ask: 56.81, high: 58.23, low: 56.68, bid: 56.99, open: 56.99 },
    { time: '2019-05-03', close: 57.15, ask: 57.15, high: 57.36, low: 56.87, bid: 57.24, open: 57.24 },
    { time: '2019-05-06', close: 56.83, ask: 56.83, high: 57.09, low: 56.74, bid: 56.91, open: 56.91 },
    { time: '2019-05-07', close: 56.69, ask: 56.69, high: 56.81, low: 56.33, bid: 56.63, open: 56.63 },
    { time: '2019-05-08', close: 56.66, ask: 56.66, high: 56.70, low: 56.25, bid: 56.38, open: 56.38 },
    { time: '2019-05-09', close: 56.12, ask: 56.12, high: 56.56, low: 55.93, bid: 56.48, open: 56.48 },
    { time: '2019-05-10', close: 56.49, ask: 56.49, high: 57.04, low: 56.26, bid: 56.91, open: 56.91 },
    { time: '2019-05-13', close: 56.72, ask: 56.72, high: 57.34, low: 56.66, bid: 56.75, open: 56.75 },
    { time: '2019-05-14', close: 56.76, ask: 56.76, high: 57.19, low: 56.50, bid: 56.55, open: 56.55 },
    { time: '2019-05-15', close: 56.51, ask: 56.51, high: 56.84, low: 56.17, bid: 56.81, open: 56.81 },
    { time: '2019-05-16', close: 57.00, ask: 57.00, high: 57.80, low: 56.82, bid: 57.38, open: 57.38 },
    { time: '2019-05-17', close: 57.06, ask: 57.06, high: 58.48, low: 57.01, bid: 58.09, open: 58.09 },
    { time: '2019-05-20', close: 59.15, ask: 59.15, high: 60.54, low: 58.00, bid: 59.01, open: 59.01 },
    { time: '2019-05-21', close: 59.10, ask: 59.10, high: 59.63, low: 58.76, bid: 59.50, open: 59.50 },
    { time: '2019-05-22', close: 59.09, ask: 59.09, high: 59.37, low: 58.96, bid: 59.25, open: 59.25 },
    { time: '2019-05-23', close: 59.00, ask: 59.00, high: 59.27, low: 58.54, bid: 58.87, open: 58.87 },
    { time: '2019-05-24', close: 59.07, ask: 59.07, high: 59.36, low: 58.67, bid: 59.32, open: 59.32 },
    { time: '2019-05-28', close: 59.21, ask: 59.21, high: 59.66, low: 59.02, bid: 59.57, open: 59.57 },
]

class Chart {
    constructor(parentNode) {
        this.W = window.innerWidth
        this.H = 768
        this.COUNT_PER_PAGE = 120
        this.DOT_LINE_WIDTH = 2
        this.DOT_WIDTH = 3
        this.POINT_WIDTH = this.W / Math.floor(this.COUNT_PER_PAGE)
        this.CURSOR_PRICE = 0
        this.CLICKED = false
        this.SIDE_OFFSET = this.H/2
        this.HOVERED_COLUMN = null
        this.AVG_PRICE = 0
        this.MIN_PRICE = 0
        this.MAX_PRICE = 0
        this.CHART_TYPE = 'line'
        this.CURSOR_ON_CANVAS = false
        this.DATA_ARRAY = []
        this.SAVED_COORDINATES = []
        this.CURSOR = { x: 0,y: 0 }
        this.COLORS = {
            background: `rgba(25, 31, 45, 0.7)`,
            success: '#32ac48',
            danger: '#db4931',
            secondary: '#434957',
            chartGradient: this.hexToRgba('#434957', 1)
        }
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.ctx.translate(0.5, 0.5);
        this.canvas.width = this.W
        this.canvas.height = this.H

        parentNode.appendChild(this.canvas)

        this.initListeners()
        this.init()
    }
    hexToRgba(hex, opacity) {
        var opacity = isNaN(opacity) ? 100 : opacity;
        var hex = hex.replace('#', '');
        if(hex.length === 6) {
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
        } else {
            var rd = hex.substring(0, 1) + hex.substring(0, 1);
            var gd = hex.substring(1, 2) + hex.substring(1, 2);
            var bd = hex.substring(2, 3) + hex.substring(2, 3);
            var r = parseInt(rd, 16);
            var g = parseInt(gd, 16);
            var b = parseInt(bd, 16);
        }
    
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    }
    getVisibleItems (){
        let limit = Math.floor(this.COUNT_PER_PAGE / 1.5)

        let m = (el, index) => ({...el, index, y: this.getYPosition(el)})

        if(this.DATA_ARRAY.length > limit) {
            const items = this.DATA_ARRAY.slice(Math.max(this.DATA_ARRAY.length - limit, 1))
            return items.map(m)
        }
        return this.DATA_ARRAY.map(m)
    }
    initListeners() {
        this.canvas.addEventListener('click', (e) => {
            this.SAVED_COORDINATES = []
            this.SAVED_COORDINATES.push({x: this.CURSOR.x, y: this.CURSOR.y, price: this.CURSOR_PRICE })
        })
        this.canvas.addEventListener('mousedown', (e) => {
            this.CLICKED = true
            this.CLICKED_POS = this.CURSOR
            this.canvas.style.cursor = 'ew-resize'
        })
        this.canvas.addEventListener('mouseup', (e) => {
            this.CLICKED = false
            this.canvas.style.cursor = 'default'
        })
        this.canvas.addEventListener('mouseleave', (e) => {
            this.CLICKED = false
        })
        this.canvas.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.COUNT_PER_PAGE = this.COUNT_PER_PAGE + 3
                // TOP_BOTTOM_OFFSET_PX += 0.3
            } else {
                if(this.COUNT_PER_PAGE <= 6) {
                    return
                }
                this.COUNT_PER_PAGE = this.COUNT_PER_PAGE - 3
                // TOP_BOTTOM_OFFSET_PX -= 0.3
            }
            this.POINT_WIDTH = this.W / this.COUNT_PER_PAGE
        })
        // Load fake data
        this.canvas.addEventListener('mouseenter', e => { this.CURSOR_ON_CANVAS = true })
        this.canvas.addEventListener('mouseleave', e => { this.CURSOR_ON_CANVAS = false })
    
        this.canvas.addEventListener('mousemove', e => {
            
            if(this.CLICKED) {
                if(e.clientY - this.canvas.offsetTop > this.CURSOR.y || e.clientX - this.canvas.offsetLeft > this.CURSOR.x) {
                    // bot
                    this.SIDE_OFFSET -= 1
                    
                } else {
                    this.SIDE_OFFSET += 1
                }
            }
            this.CURSOR.x = e.clientX - this.canvas.offsetLeft
            this.CURSOR.y = e.clientY - this.canvas.offsetTop
    
        })
        window.onresize = () => {
            this.W = window.innerWidth
            this.H = window.innerHeight - 100
            this.canvas.width = this.W
            this.canvas.height = this.H
        }
        this.canvas.addEventListener('mousemove', e => {
            this.setCursorPrice()
        })
    }
    getYPrice(y) {
        const cur = (this.H/2) - y
        const halfSide = (this.H/2) - ( (this.H/2) - (this.SIDE_OFFSET/2) )
        return ( (this.MAX_PRICE - this.AVG_PRICE) * cur / halfSide) + this.AVG_PRICE
    }
    setCursorPrice() {
        this.CURSOR_PRICE = this.getYPrice(this.CURSOR.y)
    }
    checkPointIntersections() {
        const items = this.getVisibleItems()
        if(!items.length) {
            return
        }
        const pointIndex = Math.floor( (this.CURSOR.x + this.POINT_WIDTH/2) / (this.POINT_WIDTH))
        const point = items[pointIndex]
        if(!point) {
            return
        }
        const isIntersected = ((this.CURSOR.y - 10) <= point.y) && ((this.CURSOR.y + 10) >= point.y)
        if( isIntersected ){
            this.HOVERED_COLUMN = pointIndex
        } else {
            this.HOVERED_COLUMN = null
        }
    }
    getYPosition (el) {
        const of = (this.H + this.SIDE_OFFSET)
        const offset = of / 2
        const CUR = typeof el === 'number' ? el : Number(el.bid)
        
        const CUR_OFF = (CUR - this.MIN_PRICE)
        const RES =  (this.H - of) * CUR_OFF / (this.MAX_PRICE - this.MIN_PRICE)
        return (RES + offset) || this.H/2

    }
    drawTextHint(c) {
        this.ctx.fillStyle = '#fff'
        this.ctx.font = "12px sans-serif";
        const p = this.CURSOR_PRICE.toFixed(2)
        this.ctx.fillText(`BID: ${p}`, c.x + 5, (c.y - 5) );
    }
    drawCrossLine () {
        if(!this.CURSOR_ON_CANVAS) { return }
        this.ctx.lineWidth = 1
        this.ctx.setLineDash([1,1])
        this.ctx.strokeStyle = `rgba(255,255,255,.2)`
        this.ctx.beginPath();  
        // draw X
        this.ctx.moveTo(this.CURSOR.x, 0)
        this.ctx.lineTo(this.CURSOR.x, this.W )
        this.ctx.stroke()
        this.ctx.closePath()
        // draw Y
        this.ctx.beginPath()
        this.ctx.moveTo( 0, this.CURSOR.y )
        this.ctx.lineTo(this.W, this.CURSOR.y )
        this.ctx.stroke()
        this.drawTextHint(this.CURSOR)
        
    }
    drawCurrentPriceLine() {
        if(!this.DATA_ARRAY.length) { return }
        this.ctx.lineWidth = 1
        const last = [...this.getVisibleItems()].pop()
        const yPos = this.getYPosition(last)
        
        this.ctx.strokeStyle = `rgba(255,255,255,.5)`
        // this.ctx.setLineDash([4,6])
        this.ctx.beginPath()
        this.ctx.moveTo(0, yPos   )
        this.ctx.lineTo(this.W, yPos   )
        this.ctx.stroke()
        this.ctx.fillStyle = 'rgba(255,255,255,.85)'
        this.ctx.beginPath()

        this.ctx.moveTo(this.W-90, yPos  )
        this.ctx.lineTo(this.W-80, yPos - 12  )
        this.ctx.lineTo(this.W, yPos - 12  )
        this.ctx.lineTo(this.W, yPos + 12  )
        this.ctx.lineTo(this.W-80, yPos + 12  )
        this.ctx.moveTo(this.W-90, yPos  )
        this.ctx.fill()
        this.ctx.closePath()

        // this.ctx.fillRect(W - 90, yPos - 10, 90, 20)
        this.ctx.fillStyle = this.COLORS.background
        this.ctx.font = "bold 13px sans-serif";
        this.ctx.fillText(`${last.bid}`, this.W - 90 + 12, (yPos + 5) );
    }
    drawSavedCoordinates(){
        this.SAVED_COORDINATES.forEach(c => {
            this.ctx.setLineDash([0,0])
            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = `rgba(255,255,255, .7)`
            this.ctx.beginPath();  
            
            // this.ctx.moveTo(c.x, 0)
            // this.ctx.lineTo(c.x, W)
            // this.ctx.stroke()
            
            this.ctx.beginPath()
            this.ctx.moveTo( 0, (c.y) )
            this.ctx.lineTo(this.W, (c.y) )
            this.ctx.stroke()
            this.ctx.fillStyle = `rgba(255,255,255, .7)`
            this.ctx.font = "bold 12px sans-serif";
            this.ctx.fillText(c.price.toFixed(2), c.x, (c.y) - 6 );
        })
    }
    drawHighLowLines() {
        const items = this.DATA_ARRAY
        if(!items.length) { return }

        this.ctx.lineWidth = 1
        
        const min = Math.min(...items.map(el => el.bid))
        const max = Math.max(...items.map(el => el.bid))
        const yMax = items.find(el => el.bid === max)
        const yMin = items.find(el => el.bid === min)
        const yMinCoords = this.getYPosition(yMin) 
        const yMaxCoords = this.getYPosition(yMax) 
        // LOW
        this.ctx.setLineDash([2,2])
        this.ctx.fillStyle = this.COLORS.success
        this.ctx.font = "bold 12px sans-serif";
        this.ctx.fillText(`MAX: ${max.toFixed(3)}`, this.W - 160, (yMaxCoords - 5)  );
        
        this.ctx.strokeStyle = this.COLORS.success
        this.ctx.beginPath();  
        this.ctx.moveTo( 0, yMaxCoords  )
        this.ctx.lineTo(this.W, yMaxCoords  )
        this.ctx.stroke()

        // HI
        this.ctx.setLineDash([2,2])
        this.ctx.fillStyle = this.COLORS.danger
        this.ctx.font = "bold 12px sans-serif";
        this.ctx.fillText(`MIN: ${min.toFixed(3)}`, this.W - 160, (yMinCoords - 5)  );
        this.ctx.strokeStyle = this.COLORS.danger
        this.ctx.beginPath()
        this.ctx.moveTo( 0, yMinCoords )
        this.ctx.lineTo(this.W, yMinCoords )
        this.ctx.stroke()
    }
    drawDot(el, i, prev) {
        // COLORS
        const isHovered = el.index === this.HOVERED_COLUMN
        if(isHovered) {
            this.ctx.fillStyle = '#fff'
        }
        else if((el && prev) && el.bid > prev.bid) {
            this.ctx.fillStyle = this.COLORS.success
        } else {
            this.ctx.fillStyle = this.COLORS.danger
        }
        const dotWidth = isHovered ? this.DOT_WIDTH * 2 : this.DOT_WIDTH
        const x = this.POINT_WIDTH * el.index
        const y = el.y
        if(isHovered) {
            this.ctx.beginPath()
            this.ctx.arc(x,y, dotWidth, 0, 2 * Math.PI)
            this.ctx.fill()
        }

        this.ctx.fillStyle = this.COLORS.secondary
    }
    drawDate(el) {
        const x = this.POINT_WIDTH * el.index
        this.ctx.fillStyle = this.COLORS.secondary
        this.ctx.font = "12px sans-serif";
        this.ctx.fillText(`25.08.2020`, x + 5, this.H );
    }
    drawJoinLine(el, prev) {
        if(!prev) { return }
        const elY = this.getYPosition(el)
        const elX = (el.index * this.POINT_WIDTH)
        const prevX = (prev.index * this.POINT_WIDTH)
        const prevY = this.getYPosition(prev)

        this.ctx.strokeStyle = 'rgba(255,255,255,.6)'

        this.ctx.lineWidth = this.DOT_LINE_WIDTH
        this.ctx.setLineDash([0,0])
        
        this.ctx.beginPath()
        this.ctx.moveTo(elX, elY )
        this.ctx.lineTo(prevX, prevY  )
        this.ctx.stroke()

    }
    drawBackground() {
        const items = this.getVisibleItems()
        if(!items.length) {
            return
        }
        const coords = [
            ...items.map(el => {
                return { y: this.getYPosition(el), x: (el.index * this.POINT_WIDTH) }
            }),
            { x: ((items[items.length - 1].index) * this.POINT_WIDTH), y: this.H },
        ]
        this.ctx.beginPath()
        var my_gradient = this.ctx.createLinearGradient(0, 0, 0, this.H);
        my_gradient.addColorStop(0, this.COLORS.chartGradient);
        my_gradient.addColorStop(1, this.COLORS.background);
        
        this.ctx.moveTo(0, this.H )
        coords.forEach(el => {
            this.ctx.lineTo(el.x, el.y  )
        })
        this.ctx.fillStyle = my_gradient
        this.ctx.lineTo( 0, this.H )
        this.ctx.fill()
    }
    drawPositionBackground() {
        if(!this.DATA_ARRAY.length) {
            return
        }
        const lastY = this.getYPosition(this.getVisibleItems().pop())
        const onTop = this.CURSOR.y <= lastY

        if(this.CURSOR_ON_CANVAS) {
            if(onTop) {
                var positionGradient = this.ctx.createLinearGradient(0, 0, 0, this.H);
                positionGradient.addColorStop(1, this.hexToRgba(this.COLORS.success));
                positionGradient.addColorStop(0, this.COLORS.background);
                this.ctx.fillStyle = positionGradient
                // top
                this.ctx.fillRect(0,0,this.W, lastY )
            }
            else {
                var positionGradient = this.ctx.createLinearGradient(0, 0, 0, this.H);
                positionGradient.addColorStop(0, this.hexToRgba(this.COLORS.danger));
                positionGradient.addColorStop(1, this.COLORS.background);
                this.ctx.fillStyle = positionGradient
                this.ctx.fillRect(0,lastY, this.W, this.H )
                // bot
            }
        }
    }
    drawCandle(el) {
        this.ctx.fillStyle = '#fff'
        const x = (this.POINT_WIDTH * el.index)
        // draw line
        const high = this.getYPosition(el.high)
        const low = this.getYPosition(el.low)

        if(el.close >= el.open) {
            this.ctx.fillStyle = this.COLORS.success
            this.ctx.strokeStyle = this.COLORS.success
        } else {
            this.ctx.fillStyle = this.COLORS.danger
            this.ctx.strokeStyle = this.COLORS.danger
        }


        this.ctx.setLineDash([])
        this.ctx.beginPath()
        this.ctx.moveTo(x, high)
        this.ctx.lineTo(x, low)
        this.ctx.stroke()



        const candleWidth = this.POINT_WIDTH / 8

        const bigest = el.close
        const lowest = el.open

        const b = this.getYPosition(bigest)
        const l = this.getYPosition(lowest)
        


        this.ctx.beginPath()

        this.ctx.moveTo(x - candleWidth, b)

        this.ctx.lineTo(x + candleWidth, b)

        this.ctx.lineTo(x + candleWidth, l)
        this.ctx.lineTo(x - candleWidth, l)

        this.ctx.closePath()
        this.ctx.fill()

        // this.ctx.stroke()
        // draw fat line

        // draw top
        // this.ctx.fillStyle = 'red'
        // let ay = (el.y) - halfHeight
        // this.ctx.fillRect(x,ay, width,halfHeight)
        
        // // draw bot
        // this.ctx.fillStyle = 'red'
        // const by = (el.y)
        // this.ctx.fillRect(x,by, width,halfHeight)
    }
    setData(obj) {
        this.DATA_ARRAY.push(obj)
        this.LAST_PRICE = this.DATA_ARRAY[this.DATA_ARRAY.length - 1].bid
        this.MAX_PRICE = Math.max(...this.DATA_ARRAY.map(el => el.bid))
        this.MIN_PRICE = Math.min(...this.DATA_ARRAY.map(el => el.bid))
        this.AVG_PRICE = (this.MAX_PRICE + this.MIN_PRICE) / 2
    }
    drawGrid() {
        this.ctx.lineWidth = 1
        this.ctx.setLineDash([1,1])
        const rows = this.W / this.POINT_WIDTH

        for(let i = 0; i<= rows; i++) {
            this.ctx.strokeStyle = this.COLORS.secondary
            this.ctx.beginPath()
            this.ctx.moveTo(this.POINT_WIDTH * i, 0)
            this.ctx.lineTo(this.POINT_WIDTH * i, this.H)
            this.ctx.stroke()
        }

        // Horizontal

        const count = 10
        const vh = this.H / 10

        for(let i=0; i<= count; i++) {
            const yPrice = this.getYPrice(vh * i).toFixed(2)
            this.ctx.strokeStyle = this.COLORS.secondary
            this.ctx.beginPath()
            this.ctx.moveTo(0, (vh * i))
            this.ctx.lineTo(this.W, (vh * i))
            this.ctx.stroke()

            this.ctx.fillStyle = `rgba(255,255,255,.5)`
            this.ctx.font = "bold 12px sans-serif";
            this.ctx.fillText(yPrice, this.W - 50, (vh * i) );
            
        }

    }
    drawCursorLine() {
        // let start = CLICKED_POS
        // let end = cursor
        // ctx.strokeStyle = '#fff'
        // ctx.lineWidth = 2
        // ctx.setLineDash([4,4])
        // ctx.beginPath()
        // ctx.moveTo(start.x, start.y)
        // ctx.lineTo(end.x, end.y)
        // ctx.stroke()
    }
    render() {
        if(!this.DATA_ARRAY.length) {
            return
        }
        this.ctx.fillStyle = this.COLORS.background
        // this.ctx.drawImage(background,0,0, W, H);
        this.ctx.fillRect(0,0,this.W,this.H)
        
        this.drawPositionBackground()
        this.drawBackground()
        this.drawGrid()
        
        // drawAvgPriceLine()
        this.drawSavedCoordinates()
        this.drawHighLowLines()
        const items = this.getVisibleItems()
        if(this.CHART_TYPE === 'line') {
            for(let i =0; i < items.length; i++) {
                const curr = items[i]
                const prev = i > 0 ? items[i-1] : false
                this.drawJoinLine( curr, prev )
            }
        }

        for(let i =0; i < items.length; i++) {
            const curr = items[i]
            const prev = i > 0 ? items[i-1] : false
            this.drawDot( curr, i, prev )
            if(this.CHART_TYPE === 'candle') {
                this.drawCandle(curr)
            }

            this.drawDate(curr)
        }
        // drawPulse()
        // drawArrow()
        this.drawCrossLine()
        this.drawCursorLine()
        this.drawCurrentPriceLine()
        if(this.HOVERED_COLUMN && this.CURSOR_ON_CANVAS) {
            document.body.style.cursor = 'pointer'
        } else {
            document.body.style.cursor = 'default'
        }
    }
    step() {
        this.checkPointIntersections()
        this.render()
        window.requestAnimationFrame(() => this.step())
    }
    init () {
        window.requestAnimationFrame(() => this.step())
    }
}
const c = new Chart(document.body)

setInterval(() => {
    const randItem = testData[Math.floor(Math.random() * testData.length)]
    c.setData(randItem)
}, 1000)