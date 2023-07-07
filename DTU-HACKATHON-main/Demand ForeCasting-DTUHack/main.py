import pandas as pd
import streamlit as st
import plotly.express as px
from plotly import graph_objs as go
st.title("Demand Trend Analysis)
@st.cache_data
def load_data():
    df = pd.read_csv("cleaned_data.csv",parse_dates=['Order Date'],index_col='Order Date')
    return df
df=load_data()
         
        


df_train = df.index< '2018-01-01'

df_test = df.index>= '2018-01-01'
df_train = df[df_train]
df_test = df[df_test]
time_pred = ["Past","Future"]

#display the years of data as a slider 2015-2017 for past and 2018 for future

k = st.sidebar.selectbox("Time",time_pred)
if k == "Past":
    n_years = st.sidebar.slider("Years of data", 2015, 2016, 2017)
    
    periods = 12*n_years
else:
    n_years = st.sidebar.slider("Years of data", 2018,2019)
    periods = 12

@st.cache_data
def load_data():
    data = df.copy()
    
    return data


data_load_state = st.text("Loading data...")
data = load_data()
data_load_state.text("Loading data...done!")

st.subheader("Raw data")
st.write(data.head())

def plot_raw_data_year(input:str):
    
    
    if input == "Past":
        
        df_yearly= df_train.groupby(pd.Grouper(freq='Y'))['Sales'].sum()
        df_yearly = pd.DataFrame(df_yearly)
    else:
        df_yearly = df_test.groupby(pd.Grouper(freq='Y'))['Sales'].sum()
        df_yearly = pd.DataFrame(df_yearly)
        
    fig = go.Figure()
    fig.add_trace(go.Bar(x=df_yearly.index, y=df_yearly.Sales,name='Yearly Sales' ,))
    fig.update_layout(title_text='Yearly Sales',plot_bgcolor='white',xaxis_rangeslider_visible=True)
    st.plotly_chart(fig)
    
plot_raw_data_year(k)


def plot_raw_data_month(input:str):
    if input == "Past":
        df_monthly= df_train.groupby(pd.Grouper(freq='M'))['Sales'].sum()
        df_monthly = pd.DataFrame(df_monthly)
    else:
        df_monthly = df_test.groupby(pd.Grouper(freq='M'))['Sales'].sum()
        df_monthly = pd.DataFrame(df_monthly)
        
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df_monthly.index, y=df_monthly.Sales,name='Monthly Sales' ))
    fig.update_layout(title_text= 'Monthly Sales',plot_bgcolor='white',xaxis_rangeslider_visible=True)
    st.plotly_chart(fig)
 
   
plot_raw_data_month(k)

    
def plot_raw_data_day(input:str):
    if input == "Past":
        df_daily= df_train.groupby(pd.Grouper(freq='D'))['Sales'].sum()
        df_daily = pd.DataFrame(df_daily)
    else:
        df_daily = df_test.groupby(pd.Grouper(freq='D'))['Sales'].sum()
        df_daily = pd.DataFrame(df_daily)
        
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df_daily.index, y=df_daily.Sales,name='Daily Sales' ))
    fig.update_layout(title_text= 'Daily Sales',plot_bgcolor='white',xaxis_rangeslider_visible=True)
    st.plotly_chart(fig)
    
plot_raw_data_day(k)

def plot_raw_yearly_sales_by_segment(input:str):
    
    if input == "Past":
        df_yearly_segment = df_train.groupby([pd.Grouper(freq='Y'), 'Segment'])['Sales'].sum().reset_index()

      
        df_yearly_segment = pd.DataFrame(df_yearly_segment)
    else:
        df_yearly_segment = df_test.groupby([pd.Grouper(freq='Y'), 'Segment'])['Sales'].sum().reset_index()

       
        df_yearly_segment = pd.DataFrame(df_yearly_segment)
    color_scale = px.colors.sequential.Viridis

# create a dictionary that maps each unique value in the Segment column to a color from the color scheme
    color_map = {segment: color_scale[i % len(color_scale)] for i, segment in enumerate(df_yearly_segment['Segment'].unique())}

# use the color_map dictionary to map the Segment values to colors
    colors = df_yearly_segment['Segment'].map(color_map)

# create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=df_yearly_segment['Order Date'], y=df_yearly_segment['Sales'], marker={'color': colors},hovertext=df_yearly_segment['Segment']))
    fig.update_layout(title_text='Yearly Sales by Segment', plot_bgcolor='white')
    
    st.plotly_chart(fig)
    
    
plot_raw_yearly_sales_by_segment(k)
def plot_raw_yearly_sales_by_region(input:str):
    
    if input == "Past":
        df_yearly_segment = df_train.groupby([pd.Grouper(freq='Y'), 'Region'])['Sales'].sum().reset_index()

      
        df_yearly_segment = pd.DataFrame(df_yearly_segment)
    else:
        df_yearly_segment = df_test.groupby([pd.Grouper(freq='Y'), 'Region'])['Sales'].sum().reset_index()

       
        df_yearly_segment = pd.DataFrame(df_yearly_segment)
    color_scale = px.colors.sequential.Viridis

# create a dictionary that maps each unique value in the Segment column to a color from the color scheme
    color_map = {segment: color_scale[i % len(color_scale)] for i, segment in enumerate(df_yearly_segment['Region'].unique())}

# use the color_map dictionary to map the Segment values to colors
    colors = df_yearly_segment['Region'].map(color_map)

# create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=df_yearly_segment['Order Date'], y=df_yearly_segment['Sales'], marker={'color': colors},hovertext=df_yearly_segment['Region']))
    fig.update_layout(title_text='Yearly Sales by  Region', plot_bgcolor='white')
    st.plotly_chart(fig)
    
    
plot_raw_yearly_sales_by_region(k)

def plot_raw_yearly_sales_by_Category(input:str):
    
    if input == "Past":
        df_yearly_segment = df_train.groupby([pd.Grouper(freq='Y'), 'Category'])['Sales'].sum().reset_index()

      
        
    else:
        df_yearly_segment = df_test.groupby([pd.Grouper(freq='Y'), 'Category'])['Sales'].sum().reset_index()

       
    df_yearly_segment = pd.DataFrame(df_yearly_segment)
    color_scale = px.colors.sequential.Viridis

# create a dictionary that maps each unique value in the Segment column to a color from the color scheme
    color_map = {segment: color_scale[i % len(color_scale)] for i, segment in enumerate(df_yearly_segment['Category'].unique())}

# use the color_map dictionary to map the Segment values to colors
    colors = df_yearly_segment['Category'].map(color_map)

# create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=df_yearly_segment['Order Date'], y=df_yearly_segment['Sales'], marker={'color': colors},hovertext=df_yearly_segment['Category']))
    fig.update_layout(title_text='Yearly Sales by  Category', plot_bgcolor='white')
    st.plotly_chart(fig)
    
plot_raw_yearly_sales_by_Category(k)

def plot_raw_yearly_sales_by_State(input:str, number:int):
    
    if input == "Past":
        df_yearly_state = df_train.groupby([pd.Grouper(freq='Y'), 'State'])['Sales'].sum().reset_index()
    else:
        df_yearly_state = df_test.groupby([pd.Grouper(freq='Y'), 'State'])['Sales'].sum().reset_index()
        
    df_yearly_state = pd.DataFrame(df_yearly_state)
    color_scale = px.colors.sequential.Viridis
    topN_states = df_yearly_state.groupby('State').sum().sort_values('Sales', ascending=False).head(number).index.tolist()
    top_states_df = df_yearly_state[df_yearly_state['State'].isin(topN_states)]

    # create a dictionary that maps each unique value in the State column to a color from the color scheme
    color_map = {state: color_scale[i % len(color_scale)] for i, state in enumerate(top_states_df['State'].unique())}

    # use the color_map dictionary to map the State values to colors
    colors = top_states_df['State'].map(color_map)

    # create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=top_states_df['Order Date'], y=top_states_df['Sales'], marker={'color': colors},hovertext=top_states_df['State']))
    fig.update_layout(title_text=f'Top {number} states with highest sales', plot_bgcolor='white')
    st.plotly_chart(fig)


# initialize Streamlit slider for selecting number of subcategories to display
number_st = st.slider('Select the number of States', 1, 10, 3)

plot_raw_yearly_sales_by_State(k,number_st)

def plot_raw_yearly_sales_by_Sub_Cat(input:str, number:int):
    
    if input == "Past":
        df_yearly_state = df_train.groupby([pd.Grouper(freq='Y'), 'Sub-Category'])['Sales'].sum().reset_index()
    else:
        df_yearly_state = df_test.groupby([pd.Grouper(freq='Y'), 'Sub-Category'])['Sales'].sum().reset_index()
        
    df_yearly_state = pd.DataFrame(df_yearly_state)
    color_scale = px.colors.sequential.Viridis
    topN_states = df_yearly_state.groupby('Sub-Category').sum().sort_values('Sales', ascending=False).head(number).index.tolist()
    top_states_df = df_yearly_state[df_yearly_state['Sub-Category'].isin(topN_states)]

    # create a dictionary that maps each unique value in the State column to a color from the color scheme
    color_map = {state: color_scale[i % len(color_scale)] for i, state in enumerate(top_states_df['Sub-Category'].unique())}

    # use the color_map dictionary to map the State values to colors
    colors = top_states_df['Sub-Category'].map(color_map)

    # create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=top_states_df['Order Date'], y=top_states_df['Sub-Category'], marker={'color': colors},hovertext=top_states_df['Sub-Category']))
    fig.update_layout(title_text=f'Top {number} sub categories with highest sales', plot_bgcolor='white')
    st.plotly_chart(fig)


# initialize Streamlit slider for selecting number of subcategories to display
number_sub_cat = st.slider('Select the number of Sub-Category', 1, 10, 3)

plot_raw_yearly_sales_by_Sub_Cat(k,number_sub_cat)





def plot_raw_yearly_sales_by_Product(input:str,number:int):
    
    if input == "Past":
        df_yearly_product = df_train.groupby([pd.Grouper(freq='Y'), 'Product Name'])['Sales'].sum().reset_index()
    else:
        df_yearly_product = df_test.groupby([pd.Grouper(freq='Y'), 'Product Name'])['Sales'].sum().reset_index()
       
    df_yearly_product = pd.DataFrame(df_yearly_product)
    color_scale = px.colors.sequential.Viridis
    topN_products = df_yearly_product.groupby('Product Name').sum().sort_values('Sales', ascending=False).head(number).index.tolist()
    top_product_df = df_yearly_product[df_yearly_product['Product Name'].isin(topN_products)]

    # create a dictionary that maps each unique value in the Product Name column to a color from the color scheme
    color_map = {product: color_scale[i % len(color_scale)] for i, product in enumerate(top_product_df['Product Name'].unique())}

    # use the color_map dictionary to map the Product Name values to colors
    colors = top_product_df['Product Name'].map(color_map)

    # create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=top_product_df['Order Date'], y=top_product_df['Sales'], marker={'color': colors},hovertext=top_product_df['Product Name']))
    fig.update_layout(title_text=f'Top {number} best-selling products', plot_bgcolor='white')
    st.plotly_chart(fig)

# initialize Streamlit slider for selecting number of products to display
number_p = st.slider('Select the number of products to display', 1, 10, 3)
plot_raw_yearly_sales_by_Product(k,number_p)


def plot_raw_yearly_sales_by_City(input:str, number:int):
    
    if input == "Past":
        df_yearly_state = df_train.groupby([pd.Grouper(freq='Y'), 'City'])['Sales'].sum().reset_index()
    else:
        df_yearly_state = df_test.groupby([pd.Grouper(freq='Y'), 'City'])['Sales'].sum().reset_index()
        
    df_yearly_state = pd.DataFrame(df_yearly_state)
    color_scale = px.colors.sequential.Viridis
    topN_states = df_yearly_state.groupby('City').sum().sort_values('Sales', ascending=False).head(number).index.tolist()
    top_states_df = df_yearly_state[df_yearly_state['City'].isin(topN_states)]

    # create a dictionary that maps each unique value in the State column to a color from the color scheme
    color_map = {state: color_scale[i % len(color_scale)] for i, state in enumerate(top_states_df['City'].unique())}

    # use the color_map dictionary to map the State values to colors
    colors = top_states_df['City'].map(color_map)

    # create the plot using plotly.graph_objects
    fig = go.Figure(data=go.Bar(x=top_states_df['Order Date'], y=top_states_df['City'], marker={'color': colors},hovertext=top_states_df['City']))
    fig.update_layout(title_text=f'Top {number} states with highest sales', plot_bgcolor='white')
    st.plotly_chart(fig)


# initialize Streamlit slider for selecting number of subcategories to display
number_city = st.slider('Select the number of Cities', 1, 10, 3)

plot_raw_yearly_sales_by_City(k,number_city)

    

    

    
        
        

    
    
    
    
    
    
    
